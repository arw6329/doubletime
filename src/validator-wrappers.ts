import { ConcreteSchema } from "./Validation/SchemaValidation";
import type { TypeValidator } from "./Validation/TypeValidator";
import { ArrayValidator } from "./Validation/Validators/ArrayValidator";
import { BooleanValidator } from "./Validation/Validators/BooleanValidator";
import { EnumValidator } from "./Validation/Validators/EnumValidator";
import { FloatValidator, FloatValidatorOptions } from "./Validation/Validators/FloatValidator";
import { IntegerValidator, type IntegerValidatorOptions } from "./Validation/Validators/IntegerValidator";
import { NullableValidator } from "./Validation/Validators/NullableValidator";
import { ObjectValidator } from "./Validation/Validators/ObjectValidator";
import { StringValidator, StringValidatorOptions } from "./Validation/Validators/StringValidator";
import { UuidValidator } from "./Validation/Validators/UuidValidator";

export function array<T>(elemValidator: TypeValidator<T>): ArrayValidator<T> {
    return new ArrayValidator(elemValidator)
}

export function bool(): BooleanValidator {
    return new BooleanValidator
}

export function float(options: FloatValidatorOptions = {}): FloatValidator {
    return new FloatValidator(options)
}

export function int(options: IntegerValidatorOptions = {}): IntegerValidator {
    return new IntegerValidator(options)
}

export function maybe<T>(validator: TypeValidator<T>): NullableValidator<T> {
    return new NullableValidator(validator)
}

export function object<CS extends ConcreteSchema>(concreteSchema: CS): ObjectValidator<CS> {
    return new ObjectValidator(concreteSchema)
}

export function string(options: StringValidatorOptions = {}): StringValidator {
    return new StringValidator(options)
}

export function uuid(): UuidValidator {
    return new UuidValidator
}

export function choice<T extends string>(...enumValues: T[]): EnumValidator<T> {
    return new EnumValidator(...enumValues)
}
