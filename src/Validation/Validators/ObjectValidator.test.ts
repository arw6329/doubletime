import { describe, expect, it } from '@jest/globals'
import { ObjectValidator, optionalKeys } from './ObjectValidator'
import { IntegerValidator } from './IntegerValidator'

const concreteSchema = {
    'uuid': 'uuid',
    'intArrayShort': 'int[]',
    'intArrayLong': [ 'int' ] as [ 'int' ],
    'intArrayLonger': [ new IntegerValidator ] as [ IntegerValidator ],
    'intDirectValidator': new IntegerValidator
} as const

function testObject() {
    return structuredClone({
        'uuid': '351c1982-d597-42bd-ba57-0f49b8ff7c0d',
        'intArrayShort': [ 1 ],
        'intArrayLong': [ 2, 3, 4 ],
        'intArrayLonger': [ 5 ],
        'intDirectValidator': 6
    })
}

function expectedObject() {
    return structuredClone({
        'uuid': '351c1982-d597-42bd-ba57-0f49b8ff7c0d',
        'intArrayShort': [ 1 ],
        'intArrayLong': [ 2, 3, 4 ],
        'intArrayLonger': [ 5 ],
        'intDirectValidator': 6
    })
}

describe('ObjectValidator', () => {
    it('accepts valid objects', () => {
        const validator = new ObjectValidator(concreteSchema, false)
        expect(validator.validate(testObject() as unknown)).toEqual(expectedObject())
    })

    it('rejects non-object values', () => {
        const validator = new ObjectValidator(concreteSchema, false)
        expect(() => validator.validate(123 as unknown)).toThrow('bad type')
        expect(() => validator.validate('abc' as unknown)).toThrow('bad type')
        expect(() => validator.validate(false as unknown)).toThrow('bad type')
        expect(() => validator.validate(null as unknown)).toThrow('bad type')
        expect(() => validator.validate([] as unknown)).toThrow('bad type')
    })

    it('parses JSON strings when specified', () => {
        const validator = new ObjectValidator(concreteSchema, true)
        expect(validator.validate(JSON.stringify(testObject()) as unknown)).toEqual(expectedObject())
    })

    it('does not parse JSON strings when specified', () => {
        const validator = new ObjectValidator(concreteSchema, false)
        expect(() => validator.validate(JSON.stringify(testObject()) as unknown)).toThrow('bad type')
    })

    it('rejects invalid JSON', () => {
        const validator = new ObjectValidator(concreteSchema, true)
        expect(() => validator.validate('wow!' as unknown)).toThrow('not a valid serialized JSON object')
    })

    it('does not add missing keys to original untyped object', () => {
        const validator = new ObjectValidator({
            [optionalKeys]: true,
            a: 'int?'
        }, false)

        const untypedObject = {} as unknown
        validator.validate(untypedObject)
        expect(typeof (untypedObject as any)['a']).toBe(undefined)
    })
})
