import { describe, expect, it } from '@jest/globals'
import { ObjectValidator } from './ObjectValidator'

const runtimeValidator = {
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
        const validator = new ObjectValidator(runtimeValidator, false)
        expect(validator.validate(testObject() as unknown)).toEqual([expectedObject(), null])
    })

    it('rejects non-object values', () => {
        const validator = new ObjectValidator(runtimeValidator, false)
        const expectedResult = [null, 'value not of expected type']
        expect(validator.validate(123 as unknown)).toEqual(expectedResult)
        expect(validator.validate('abc' as unknown)).toEqual(expectedResult)
        expect(validator.validate(false as unknown)).toEqual(expectedResult)
        expect(validator.validate(null as unknown)).toEqual(expectedResult)
        expect(validator.validate([] as unknown)).toEqual(expectedResult)
    })

    it('parses JSON strings when specified', () => {
        const validator = new ObjectValidator(runtimeValidator, true)
        expect(validator.validate(JSON.stringify(testObject()) as unknown)).toEqual([expectedObject(), null])
    })

    it('does not parse JSON strings when specified', () => {
        const validator = new ObjectValidator(runtimeValidator, false)
        const expectedResult = [null, 'value not of expected type']
        expect(validator.validate(JSON.stringify(testObject()) as unknown)).toEqual(expectedResult)
    })
})
