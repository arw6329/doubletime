import type { ShorthandValidatorKey, ShorthandValidators } from "./ShorthandValidators"
import { nullable } from "./Validators/ObjectValidator"
import { ArrayValidator } from "./Validators/ArrayValidator"
import { type TypeValidator } from "./TypeValidator"

export type ConcreteSchemaValue = TypeValidator<unknown> | ShorthandValidatorKey | ConcreteSchema | [ ConcreteSchemaValue ]

export type ConcreteSchema = {
    [configKey: symbol]: boolean,
    [key: string]: ConcreteSchemaValue
}

type Empty<T> = keyof T extends never ? T : never

type ValiatedType<V> = V extends TypeValidator<infer T> ? T : never

type ProcessShorthand<K> = K extends ShorthandValidatorKey
    ? (typeof ShorthandValidators)[K] : K

type ProcessConcreteSchemaInArray<K> = K extends [ConcreteSchema]
    ? ArrayValidator<RecursiveFlattenSchema<K[0]>> : K

type ProcessShorthandInArray<K> = K extends [ShorthandValidatorKey]
    ? ArrayValidator<ValiatedType<ProcessShorthand<K[0]>>> : K

type ProcessValidatorInArray<K> = K extends [TypeValidator<infer T>]
    ? ArrayValidator<T> : K

type ProcessKey<K> = ValiatedType<
    ProcessShorthand<
        ProcessConcreteSchemaInArray<
            ProcessShorthandInArray<
                ProcessValidatorInArray<K>
            >
        >
    >
>

type OnlyNonOptionals<CS> = {
    [Key in keyof CS as Key extends `${string}?` ? never : Key]: CS[Key]
}

type OnlyOptionals<CS> = {
    [Key in keyof CS as Key extends `${infer KeyName}?` ? KeyName : never]?: CS[Key]
}

type NullIfCSHasNullableSymbol<CS> = CS extends {[nullable]: true}
    ? null : never

type NeverKeysRemoved<T> = {
    [K in keyof T as T[K] extends never ? never : K]: T[K];
}

type NoNeverValues<T> = NeverKeysRemoved<T> extends T ? NeverKeysRemoved<T> : never

type NoSymbols<T> = T extends symbol ? never : T

type FlattenHalfSchema<CS> = {
    [Key in keyof CS as NoSymbols<Key>]: Required<CS>[Key] extends ConcreteSchema
        ? RecursiveFlattenSchema<CS[Key]>
        : ProcessKey<CS[Key]>
}

type RecursiveFlattenSchema<CS> = NoNeverValues<(
    FlattenHalfSchema<OnlyNonOptionals<CS>> & FlattenHalfSchema<OnlyOptionals<CS>>
) | NullIfCSHasNullableSymbol<CS>>

type ExpandRecursively<T> = T extends object
    ? T extends infer O ? { [K in keyof O]: ExpandRecursively<O[K]> } : never
    : T;

type DenyNonRecord<T> = T extends Record<symbol | string, unknown> ? T : never

type SchemaFlatEntrypoint<CS> = ExpandRecursively<RecursiveFlattenSchema<DenyNonRecord<CS>>>

export type Schema<CS> = SchemaFlatEntrypoint<CS> extends never
    ? never
    : (SchemaFlatEntrypoint<CS> | NullIfCSHasNullableSymbol<CS>)
