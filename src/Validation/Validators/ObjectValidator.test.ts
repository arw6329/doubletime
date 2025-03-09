import { describe, expect, it } from '@jest/globals'
import { ObjectValidator } from './ObjectValidator'

const concreteSchema = {
    'uuid': 'uuid'
} as const

function testObject() {
    return structuredClone({
        'uuid': '351c1982-d597-42bd-ba57-0f49b8ff7c0d'
    })
}

function expectedObject() {
    return structuredClone({
        'uuid': '351c1982-d597-42bd-ba57-0f49b8ff7c0d'
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
})
