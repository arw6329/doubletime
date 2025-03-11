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

    it('rejects numeric strings (when parseStrings not specified)', () => {
        const validator = new FloatValidator
        expect(() => validator.validate('5' as unknown)).toThrow('bad type')
        expect(() => validator.validate('100.7' as unknown)).toThrow('bad type')
    })

    it('rejects non-numeric strings even when parseStrings is true', () => {
        const validator = new FloatValidator({
            parseStrings: true
        })
        expect(() => validator.validate('abc' as unknown)).toThrow(`value "abc" not a valid numeric string`)
    })

    it('parses numeric strings when parseStrings is true', () => {
        const validator = new FloatValidator({
            parseStrings: true
        })
        expect(validator.validate('123.456' as unknown)).toBeCloseTo(123.456)
        expect(validator.validate('-0.5' as unknown)).toBeCloseTo(-0.5)
        expect(validator.validate('10' as unknown)).toBeCloseTo(10)
    })

    it('rejects values below min', () => {
        const validator = new FloatValidator({
            min: 1
        })
        expect(() => validator.validate(0.5 as unknown)).toThrow(`value "0.5" is not valid; minimum accepted value is 1`)
    })

    it('rejects values above max', () => {
        const validator = new FloatValidator({
            max: -50
        })
        expect(() => validator.validate(-49.9 as unknown)).toThrow(`value "-49.9" is not valid; maximum accepted value is -50`)
    })

    it('rejects values where ensure callback fails', () => {
        const validator = new FloatValidator({
            ensure: (number) => false
        })
        expect(() => validator.validate(20 as unknown)).toThrow(`value "20" is not valid; value did not pass a custom validation function`)
    })

    it('accepts valid floats within multiple constraints', () => {
        const validator = new FloatValidator({
            parseStrings: true,
            min: -1.5,
            max: 1.5,
            ensure: (number) => number + 1 === 2 + number - 1
        })
        expect(validator.validate(0 as unknown)).toBeCloseTo(0)
        expect(validator.validate(-1.5 as unknown)).toBeCloseTo(-1.5)
        expect(validator.validate(1.5 as unknown)).toBeCloseTo(1.5)
        expect(validator.validate(0.75 as unknown)).toBeCloseTo(0.75)
        expect(validator.validate(1 as unknown)).toBeCloseTo(1)
        expect(validator.validate('-1.25' as unknown)).toBeCloseTo(-1.25)
    })
})