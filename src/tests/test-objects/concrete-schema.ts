import { nullable } from '#/entrypoint'

export const concreteSchema = {
    'uuid': 'uuid',
    'uuid nulled': 'uuid?',
    'uuid nullable': 'uuid?',
    'string': 'string',
    'string nulled': 'string?',
    'string nullable': 'string?',
    'empty string': 'string',
    'empty string nulled': 'string?',
    'empty string nullable': 'string?',
    'trimmed string': 'trimmed string',
    'trimmed string nulled': 'trimmed string?',
    'trimmed string nullable': 'trimmed string?',
    'non-empty string': 'non-empty string',
    'non-empty string nulled': 'non-empty string?',
    'non-empty string nullable': 'non-empty string?',
    'trimmed non-empty string': 'trimmed non-empty string',
    'trimmed non-empty string nulled': 'trimmed non-empty string?',
    'trimmed non-empty string nullable': 'trimmed non-empty string?',
    'integer': 'integer',
    'integer nulled': 'integer?',
    'integer nullable': 'integer?',
    'float': 'float',
    'float nulled': 'float?',
    'float nullable': 'float?',
    'boolean': 'boolean',
    'boolean nulled': 'boolean?',
    'boolean nullable': 'boolean?',
    'object': {
        a: 'integer',
        b: 'string',
        c: 'boolean'
    },
    'object nulled': {
        [nullable]: true,
        d: 'integer'
    },
    'object nullable': {
        [nullable]: true,
        e: 'integer'
    },
    'nested object parent': {
        'nested object child': {
            a: 'integer',
            b: 'string',
            c: 'boolean',
            array: 'int[]'
        }
    },
    'optional?': 'string',
    'optional provided?': 'string',
    'optional nulled provided?': 'string?',
    'optional nullable?': 'string?',
    'optional nullable provided?': 'string?',

    // arrays
    '(uuid)[]': 'uuid[]',
    '(uuid nullable)[]': 'uuid?[]',
    '(uuid nullable)[] nulled': 'uuid?[]?',
    '(uuid nullable)[] nullable': 'uuid?[]?',
    '(string)[]': 'string[]',
    '(string nullable)[]': 'string?[]',
    '(empty string)[]': 'string[]',
    '(empty string nullable)[]': 'string?[]',
    '(trimmed string)[]': 'trimmed string[]',
    '(trimmed string nullable)[]': 'trimmed string?[]',
    '(non-empty string)[]': 'non-empty string[]',
    '(non-empty string nullable)[]': 'non-empty string?[]',
    '(trimmed non-empty string)[]': 'trimmed non-empty string[]',
    '(trimmed non-empty string nullable)[]': 'trimmed non-empty string?[]',
    '(integer)[]': 'integer[]',
    '(integer nullable)[]': 'integer?[]',
    '(float)[]': 'float[]',
    '(float nullable)[]': 'float?[]',
    '(boolean)[]': 'boolean[]',
    '(boolean nullable)[]': 'boolean?[]',
    '(optional)[]?': 'string[]',
    '(optional provided)[]?': 'string[]',
    '(optional nullable)[]?': 'string?[]',
    '(optional nullable provided)[]?': 'string?[]'
} as const
