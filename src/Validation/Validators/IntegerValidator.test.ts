import { describe, expect, it } from '@jest/globals'
import { IntegerValidator } from './IntegerValidator'

describe('IntegerValidator', () => {
    it('accepts valid integers', () => {
        const validator = new IntegerValidator
        expect(validator.validate(50 as unknown)).toBe(50)
        expect(validator.validate(0 as unknown)).toBe(0)
        expect(validator.validate(-50 as unknown)).toBe(-50)
        expect(validator.validate(5.0 as unknown)).toBe(5)
    })

    it('rejects non-number values', () => {
        const validator = new IntegerValidator
        expect(() => validator.validate('abc' as unknown)).toThrow('bad type')
        expect(() => validator.validate(false as unknown)).toThrow('bad type')
        expect(() => validator.validate(null as unknown)).toThrow('bad type')
        expect(() => validator.validate({} as unknown)).toThrow('bad type')
    })

    it('rejects numeric strings', () => {
        const validator = new IntegerValidator
        expect(() => validator.validate('5' as unknown)).toThrow('bad type')
    })

    it('rejects floating point values', () => {
        const validator = new IntegerValidator
        expect(() => validator.validate(5.5 as unknown)).toThrow('not a valid integer')
        expect(() => validator.validate(-7.3 as unknown)).toThrow('not a valid integer')
        expect(() => validator.validate(0.1 as unknown)).toThrow('not a valid integer')
    })
})