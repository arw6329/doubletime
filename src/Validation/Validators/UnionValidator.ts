import { BadSchemaError, SchemaValidationError } from "#/errors"
import { TypeValidator } from "../TypeValidator"

export type ElementsOf<T> = T extends (infer ElemT)[] ? ElemT : never

export class UnionValidator<T extends [...unknown[]]> extends TypeValidator<ElementsOf<T>> {
    private validators: {[Key in keyof T]: TypeValidator<T[Key]>}

    constructor(
        ...validators: {[Key in keyof T]: TypeValidator<T[Key]>}
    ) {
        super()

        if(validators.length === 0) {
            throw new BadSchemaError('union validators must contain at least one constituent validator')
        }

        this.validators = validators
    }
    
    validate(value: unknown): ElementsOf<T> {
        const errors: Error[] = []

        for(const validator of this.validators) {
            try {
                const typedValue = validator.validate(value)
                return typedValue as ElementsOf<T>
            } catch(e) {
                if(e instanceof Error) {
                    errors.push(e)
                    continue
                } else {
                    throw e
                }
            }
        }

        throw new SchemaValidationError(`value "${value}" did not match any member of union type. Component errors were: ${errors.map(error => error.message).join('; ')}`)
    }   
}
