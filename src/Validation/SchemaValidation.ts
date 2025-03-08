import type { NullableValidator } from "./Validators/NullableValidator"
import type { ShorthandValidatorKey, ShorthandValidators } from "./ShorthandValidators"
import { nullable } from "./Validators/ObjectValidator"
import { ArrayValidator } from "./Validators/ArrayValidator"

export interface TypeValidator<T> {
    validate(value: unknown): [value: T, error: null] | [value: null, error: string]
}

type PureValidator<S> = {
    [Key in keyof S]:
        TypeValidator<S[Key]>|PureValidator<S[Key]>
}

export type Validator = {
    [configKey: symbol]: boolean,
    [key: string]: TypeValidator<unknown>|ShorthandValidatorKey|Validator
}

type Empty<T> = keyof T extends never ? T : never

type NormalizedValidator<V> = {
    [Key in keyof V as Key extends symbol ? never : Key]:
        V[Key] extends ShorthandValidatorKey
        ? (typeof ShorthandValidators)[V[Key]]
        : V[Key] extends TypeValidator<unknown>
        ? V[Key]
        : V[Key] extends [ShorthandValidatorKey]
        ? ArrayValidator<number>
        : V[Key] extends [TypeValidator<infer T>]
        ? ArrayValidator<T>
        : V[Key] extends {[nullable]: true}
        ? NullableValidator<SchemaPreOptionalProcessing<V[Key]>>
        : V[Key] extends Empty<V[Key]>
        ? undefined
        : V[Key] extends Record<string | symbol, unknown>
        ? NormalizedValidator<V[Key]>
        : undefined
}

type SchemaPreOptionalProcessing<V> = NormalizedValidator<V> extends PureValidator<infer S> ? S : never

// https://github.com/microsoft/TypeScript/issues/32562
type Identity<T> = T;
type Merge<T> = (
    T extends any ?
    Identity<{ [k in keyof T] : T[k] }> :
    never
)

type SchemaProcessOptionals<S extends SchemaPreOptionalProcessing<unknown>> = Merge<{
    [Key in keyof S as Key extends `${string}?` ? never : Key]: S[Key]
} & {
    [Key in keyof S as Key extends `${infer KeyName}?` ? KeyName : never]?: S[Key]
}>

export type Schema<V> = SchemaProcessOptionals<SchemaPreOptionalProcessing<V>>
