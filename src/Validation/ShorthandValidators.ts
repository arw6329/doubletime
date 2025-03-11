import { NullableValidator } from "./Validators/NullableValidator"
import { BooleanValidator } from "./Validators/BooleanValidator"
import { FloatValidator } from "./Validators/FloatValidator"
import { IntegerValidator } from "./Validators/IntegerValidator"
import { NoopValidator } from "./Validators/NoopValidator"
import { StringValidator } from "./Validators/StringValidator"
import { UTCDateValidator } from "./Validators/UTCDateValidator"
import { UTCTimestampValidator } from "./Validators/UTCTimestampValidator"
import { UuidValidator } from "./Validators/UuidValidator"
import { ArrayValidator } from "./Validators/ArrayValidator"

export type ShorthandValidatorKey = keyof typeof ShorthandValidators

export const ShorthandValidators = {
    'uuid': new UuidValidator,
    'uuid?': new NullableValidator(new UuidValidator),
    'string': new StringValidator,
    'string?': new NullableValidator(new StringValidator),
    'trimmed string': new StringValidator({ trim: true }),
    'trimmed string?': new NullableValidator(new StringValidator({ trim: true })),
    'non-empty string': new StringValidator({ minLength: 1 }),
    'non-empty string?': new NullableValidator(new StringValidator({ minLength: 1 })),
    'trimmed non-empty string': new StringValidator({ minLength: 1, trim: true }),
    'trimmed non-empty string?': new NullableValidator(new StringValidator({ minLength: 1, trim: true })),
    'integer': new IntegerValidator,
    'integer?': new NullableValidator(new IntegerValidator),
    'int': new IntegerValidator,
    'int?': new NullableValidator(new IntegerValidator),
    'float': new FloatValidator,
    'float?': new NullableValidator(new FloatValidator),
    'boolean': new BooleanValidator,
    'boolean?': new NullableValidator(new BooleanValidator),
    'date': new UTCDateValidator(true),
    'date?': new NullableValidator(new UTCDateValidator(true)),
    'timestamp': new UTCTimestampValidator(true),
    'timestamp?': new NullableValidator(new UTCTimestampValidator(true)),
    'unknown': new NoopValidator,
    'uuid[]': new ArrayValidator(new UuidValidator),
    'uuid?[]': new ArrayValidator(new NullableValidator(new UuidValidator)),
    'string[]': new ArrayValidator(new StringValidator),
    'string?[]': new ArrayValidator(new NullableValidator(new StringValidator)),
    'trimmed string[]': new ArrayValidator(new StringValidator({ trim: true })),
    'trimmed string?[]': new ArrayValidator(new NullableValidator(new StringValidator({ trim: true }))),
    'non-empty string[]': new ArrayValidator(new StringValidator({ minLength: 1 })),
    'non-empty string?[]': new ArrayValidator(new NullableValidator(new StringValidator({ minLength: 1 }))),
    'trimmed non-empty string[]': new ArrayValidator(new StringValidator({ minLength: 1, trim: true })),
    'trimmed non-empty string?[]': new ArrayValidator(new NullableValidator(new StringValidator({ minLength: 1, trim: true }))),
    'integer[]': new ArrayValidator(new IntegerValidator),
    'integer?[]': new ArrayValidator(new NullableValidator(new IntegerValidator)),
    'int[]': new ArrayValidator(new IntegerValidator),
    'int?[]': new ArrayValidator(new NullableValidator(new IntegerValidator)),
    'float[]': new ArrayValidator(new FloatValidator),
    'float?[]': new ArrayValidator(new NullableValidator(new FloatValidator)),
    'boolean[]': new ArrayValidator(new BooleanValidator),
    'boolean?[]': new ArrayValidator(new NullableValidator(new BooleanValidator)),
    'date[]': new ArrayValidator(new UTCDateValidator(true)),
    'date?[]': new ArrayValidator(new NullableValidator(new UTCDateValidator(true))),
    'timestamp[]': new ArrayValidator(new UTCTimestampValidator(true)),
    'timestamp?[]': new ArrayValidator(new NullableValidator(new UTCTimestampValidator(true))),
    'unknown[]': new ArrayValidator(new NoopValidator),
    'uuid[]?': new NullableValidator(new ArrayValidator(new UuidValidator)),
    'uuid?[]?': new NullableValidator(new ArrayValidator(new NullableValidator(new UuidValidator))),
    'string[]?': new NullableValidator(new ArrayValidator(new StringValidator)),
    'string?[]?': new NullableValidator(new ArrayValidator(new NullableValidator(new StringValidator))),
    'trimmed string[]?': new NullableValidator(new ArrayValidator(new StringValidator({ trim: true }))),
    'trimmed string?[]?': new NullableValidator(new ArrayValidator(new NullableValidator(new StringValidator({ trim: true })))),
    'non-empty string[]?': new NullableValidator(new ArrayValidator(new StringValidator({ minLength: 1 }))),
    'non-empty string?[]?': new NullableValidator(new ArrayValidator(new NullableValidator(new StringValidator({ minLength: 1 })))),
    'trimmed non-empty string[]?': new NullableValidator(new ArrayValidator(new StringValidator({ minLength: 1, trim: true }))),
    'trimmed non-empty string?[]?': new NullableValidator(new ArrayValidator(new NullableValidator(new StringValidator({ minLength: 1, trim: true })))),
    'integer[]?': new NullableValidator(new ArrayValidator(new IntegerValidator)),
    'integer?[]?': new NullableValidator(new ArrayValidator(new NullableValidator(new IntegerValidator))),
    'int[]?': new NullableValidator(new ArrayValidator(new IntegerValidator)),
    'int?[]?': new NullableValidator(new ArrayValidator(new NullableValidator(new IntegerValidator))),
    'float[]?': new NullableValidator(new ArrayValidator(new FloatValidator)),
    'float?[]?': new NullableValidator(new ArrayValidator(new NullableValidator(new FloatValidator))),
    'boolean[]?': new NullableValidator(new ArrayValidator(new BooleanValidator)),
    'boolean?[]?': new NullableValidator(new ArrayValidator(new NullableValidator(new BooleanValidator))),
    'date[]?': new NullableValidator(new ArrayValidator(new UTCDateValidator(true))),
    'date?[]?': new NullableValidator(new ArrayValidator(new NullableValidator(new UTCDateValidator(true)))),
    'timestamp[]?': new NullableValidator(new ArrayValidator(new UTCTimestampValidator(true))),
    'timestamp?[]?': new NullableValidator(new ArrayValidator(new NullableValidator(new UTCTimestampValidator(true)))),
    'unknown[]?': new NullableValidator(new ArrayValidator(new NoopValidator))
} as const