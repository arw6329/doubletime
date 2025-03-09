import { describe, expect, it } from '@jest/globals'
import { FloatValidator } from './FloatValidator'

describe('FloatValidator', () => {
    it('accepts valid numbers', () => {
        const validator = new FloatValidator
        expect(validator.validate(5 as unknown)).toBeCloseTo(5)
        expect(validator.validate(0.043 as unknown)).toBeCloseTo(0.043)
        expect(validator.validate(-100.7 as unknown)).toBeCloseTo(-100.7)
        expect(validator.validate(36.89 as unknown)).toBeCloseTo(36.89)
    })

    it('rejects non-number values', () => {
        const validator = new FloatValidator
        expect(() => validator.validate('abc' as unknown)).toThrow('bad type')
        expect(() => validator.validate(false as unknown)).toThrow('bad type')
        expect(() => validator.validate(null as unknown)).toThrow('bad type')
        expect(() => validator.validate({} as unknown)).toThrow('bad type')
    })

    it('rejects numeric strings', () => {
        const validator = new FloatValidator
        expect(() => validator.validate('5' as unknown)).toThrow('bad type')
        expect(() => validator.validate('100.7' as unknown)).toThrow('bad type')
    })
})