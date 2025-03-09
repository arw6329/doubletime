import type { NullableValidator } from "./Validators/NullableValidator"
import type { ShorthandValidatorKey, ShorthandValidators } from "./ShorthandValidators"
import { nullable } from "./Validators/ObjectValidator"
import { ArrayValidator } from "./Validators/ArrayValidator"

export interface TypeValidator<T> {
    validate(value: unknown): [value: T, error: null] | [value: null, error: string]
}

type PureConcreteSchema<S> = {
    [Key in keyof S]:
        TypeValidator<S[Key]> | PureConcreteSchema<S[Key]>
}

export type ConcreteSchema = {
    [configKey: symbol]: boolean,
    [key: string]: TypeValidator<unknown> | ShorthandValidatorKey | ConcreteSchema
}

type Empty<T> = keyof T extends never ? T : never

type NormalizedConcreteSchema<CS> = {
    [Key in keyof CS as Key extends symbol ? never : Key]:
        CS[Key] extends ShorthandValidatorKey
        ? (typeof ShorthandValidators)[CS[Key]]
        : CS[Key] extends TypeValidator<unknown>
        ? CS[Key]
        : CS[Key] extends [ShorthandValidatorKey]
        ? ArrayValidator<number>
        : CS[Key] extends [TypeValidator<infer T>]
        ? ArrayValidator<T>
        : CS[Key] extends {[nullable]: true}
        ? NullableValidator<SchemaPreOptionalProcessing<CS[Key]>>
        : CS[Key] extends Empty<CS[Key]>
        ? undefined
        : CS[Key] extends Record<string | symbol, unknown>
        ? NormalizedConcreteSchema<CS[Key]>
        : undefined
}

type SchemaPreOptionalProcessing<ConcreteSchema> = NormalizedConcreteSchema<ConcreteSchema> extends PureConcreteSchema<infer S> ? S : never

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
