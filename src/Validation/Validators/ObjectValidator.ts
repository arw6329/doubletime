import type { Schema, TypeValidator, Validator } from "../SchemaValidation"
import { ShorthandValidators } from "../ShorthandValidators"

function isTypeValidator<T>(validator: Validator|TypeValidator<T>): validator is TypeValidator<T> {
    return 'validate' in validator && validator.validate instanceof Function
}

export const nullable = Symbol('whether an object-valued key is nullable')
export const optionalKeys = Symbol('whether keys marked as nullable are optional and default to null')

type UnknownObj = { [key: string]: unknown }

export class ObjectValidator<V extends Validator> implements TypeValidator<Schema<V>> {
    constructor(
        private validator: V,
        private parseStrings: boolean = false
    ) {}

    validate(params: unknown): [value: null, error: string] | [value: Schema<V>, error: null] {
        if(this.parseStrings && typeof params === 'string') {
            try {
                params = JSON.parse(params)
            } catch(e) {
                return [null, `string value not a serialized JSON object`]
            }
        }

        if(typeof params !== 'object' || Array.isArray(params) || params === null) {
            return [null, `value not of expected type`]
        }

        const rawParams: UnknownObj = params as UnknownObj

        const parsedParams: Schema<V> = {} as Schema<V>

        for(const keyWithPossibleQuestionMark of Object.keys(this.validator) as Array<keyof Validator & string>) {
            // need to remove question mark if key was marked optional
            const key = keyWithPossibleQuestionMark.replace(/\?$/, '')

            if(!key) {
                return [null, `empty schema property key names are illegal`]
            }

            if(!(key in params) || params[key as keyof typeof params] === undefined) {
                // Key was not present in object
                if(keyWithPossibleQuestionMark.endsWith('?')) {
                    // Key was optional, just continue
                    continue
                }

                if(!(optionalKeys in this.validator && this.validator[optionalKeys] === true)) {
                    // Object is not marked as "missing nullable keys default to null",
                    // so key was required. Raise error
                    return [null, `required parameter ${String(key)} not provided`]
                }
            }

            // Default to null if key not provided.
            // At this point, key is either defined (possibly null)
            // or missing but marked as "default to null".
            rawParams[key] ??= null

            let singleKeyValidator: TypeValidator<unknown> | Validator

            const nonNormalizedSingleKeyValidator = this.validator[keyWithPossibleQuestionMark] as Validator[keyof Validator & string]

            if(typeof nonNormalizedSingleKeyValidator === 'string') {
                singleKeyValidator = ShorthandValidators[nonNormalizedSingleKeyValidator]
            } else {
                singleKeyValidator = nonNormalizedSingleKeyValidator
            }

            if(isTypeValidator(singleKeyValidator)) {
                const [value, error] = singleKeyValidator.validate(rawParams[key])
        
                if(error !== null) {
                    return [null, `error during validation of parameter ${String(key)}: ${error}`]
                }
        
                parsedParams[key as keyof Schema<V>] = value as Schema<V>[keyof Schema<V>]
            } else {
                if(singleKeyValidator[nullable] === true && rawParams[key] === null) {
                    // using NullableValidator(ObjectValidator) resulted in infinite recursion in tsc for some reason
                    parsedParams[key as keyof Schema<V>] = null as Schema<V>[keyof Schema<V>]
                } else {
                    // also infinite recursion here if this isn't typed as unknown
                    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                    const subTypeValidator: any = new ObjectValidator(singleKeyValidator)

                    const [value, error] = subTypeValidator.validate(params[key as keyof typeof params]) as [null, string] | [unknown, null]
    
                    if(error !== null) {
                        return [null, `error during validation of parameter ${String(key)}: ${error}`]
                    }
    
                    parsedParams[key as keyof Schema<V>] = value as Schema<V>[keyof Schema<V>]
                }
            }
        }

        return [ parsedParams, null ]
    }
}