import { NullableValidator as nullable } from "./Validators/NullableValidator"
import { BooleanValidator as boolean } from "./Validators/BooleanValidator"
import { FloatValidator as float } from "./Validators/FloatValidator"
import { IntegerValidator as int } from "./Validators/IntegerValidator"
import { NoopValidator as noop } from "./Validators/NoopValidator"
import { StringValidator as string } from "./Validators/StringValidator"
import { UTCDateValidator as date } from "./Validators/UTCDateValidator"
import { UTCTimestampValidator as timestamp } from "./Validators/UTCTimestampValidator"
import { UuidValidator as uuid } from "./Validators/UuidValidator"
import { ArrayValidator as array } from "./Validators/ArrayValidator"

export type ShorthandValidatorKey = keyof typeof ShorthandValidators

export const ShorthandValidators = {
    'uuid': new uuid,
    'uuid?': new nullable(new uuid),
    'string': new string(true, false),
    'string?': new nullable(new string(true, false)),
    'trimmed string': new string(true, true),
    'trimmed string?': new nullable(new string(true, true)),
    'non-empty string': new string(false, false),
    'non-empty string?': new nullable(new string(false, false)),
    'trimmed non-empty string': new string(false, true),
    'trimmed non-empty string?': new nullable(new string(false, true)),
    'integer': new int,
    'integer?': new nullable(new int),
    'int': new int,
    'int?': new nullable(new int),
    'float': new float,
    'float?': new nullable(new float),
    'boolean': new boolean,
    'boolean?': new nullable(new boolean),
    'date': new date(true),
    'date?': new nullable(new date(true)),
    'timestamp': new timestamp(true),
    'timestamp?': new nullable(new timestamp(true)),
    'unknown': new noop,
    'uuid[]': new array(new uuid),
    'uuid?[]': new array(new nullable(new uuid)),
    'string[]': new array(new string(true, false)),
    'string?[]': new array(new nullable(new string(true, false))),
    'trimmed string[]': new array(new string(true, true)),
    'trimmed string?[]': new array(new nullable(new string(true, true))),
    'non-empty string[]': new array(new string(false, false)),
    'non-empty string?[]': new array(new nullable(new string(false, false))),
    'trimmed non-empty string[]': new array(new string(false, true)),
    'trimmed non-empty string?[]': new array(new nullable(new string(false, true))),
    'integer[]': new array(new int),
    'integer?[]': new array(new nullable(new int)),
    'int[]': new array(new int),
    'int?[]': new array(new nullable(new int)),
    'float[]': new array(new float),
    'float?[]': new array(new nullable(new float)),
    'boolean[]': new array(new boolean),
    'boolean?[]': new array(new nullable(new boolean)),
    'date[]': new array(new date(true)),
    'date?[]': new array(new nullable(new date(true))),
    'timestamp[]': new array(new timestamp(true)),
    'timestamp?[]': new array(new nullable(new timestamp(true))),
    'unknown[]': new array(new noop),
    'uuid[]?': new nullable(new array(new uuid)),
    'uuid?[]?': new nullable(new array(new nullable(new uuid))),
    'string[]?': new nullable(new array(new string(true, false))),
    'string?[]?': new nullable(new array(new nullable(new string(true, false)))),
    'trimmed string[]?': new nullable(new array(new string(true, true))),
    'trimmed string?[]?': new nullable(new array(new nullable(new string(true, true)))),
    'non-empty string[]?': new nullable(new array(new string(false, false))),
    'non-empty string?[]?': new nullable(new array(new nullable(new string(false, false)))),
    'trimmed non-empty string[]?': new nullable(new array(new string(false, true))),
    'trimmed non-empty string?[]?': new nullable(new array(new nullable(new string(false, true)))),
    'integer[]?': new nullable(new array(new int)),
    'integer?[]?': new nullable(new array(new nullable(new int))),
    'int[]?': new nullable(new array(new int)),
    'int?[]?': new nullable(new array(new nullable(new int))),
    'float[]?': new nullable(new array(new float)),
    'float?[]?': new nullable(new array(new nullable(new float))),
    'boolean[]?': new nullable(new array(new boolean)),
    'boolean?[]?': new nullable(new array(new nullable(new boolean))),
    'date[]?': new nullable(new array(new date(true))),
    'date?[]?': new nullable(new array(new nullable(new date(true)))),
    'timestamp[]?': new nullable(new array(new timestamp(true))),
    'timestamp?[]?': new nullable(new array(new nullable(new timestamp(true)))),
    'unknown[]?': new nullable(new array(new noop))
} as const