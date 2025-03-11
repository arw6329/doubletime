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

    it('rejects numeric strings (when parseStrings not specified)', () => {
        const validator = new IntegerValidator
        expect(() => validator.validate('5' as unknown)).toThrow('bad type')
    })

    it('rejects floating point values', () => {
        const validator = new IntegerValidator
        expect(() => validator.validate(5.5 as unknown)).toThrow('not a valid integer')
        expect(() => validator.validate(-7.3 as unknown)).toThrow('not a valid integer')
        expect(() => validator.validate(0.1 as unknown)).toThrow('not a valid integer')
    })

    it('rejects non-integer strings even when parseStrings is true', () => {
        const validator = new IntegerValidator({
            parseStrings: true
        })
        expect(() => validator.validate('abc' as unknown)).toThrow(`value "abc" not a valid integer string`)
    })

    it('parses integer strings when parseStrings is true', () => {
        const validator = new IntegerValidator({
            parseStrings: true
        })
        expect(validator.validate('123' as unknown)).toBe(123)
        expect(validator.validate('-123' as unknown)).toBe(-123)
    })

    it('rejects values below min', () => {
        const validator = new IntegerValidator({
            min: 50
        })
        expect(() => validator.validate(40 as unknown)).toThrow(`value "40" is not valid; minimum accepted value is 50`)
    })

    it('rejects values above max', () => {
        const validator = new IntegerValidator({
            max: 50
        })
        expect(() => validator.validate(60 as unknown)).toThrow(`value "60" is not valid; maximum accepted value is 50`)
    })

    it('rejects values of wrong parity (expecting even)', () => {
        const validator = new IntegerValidator({
            parity: 'even'
        })
        expect(() => validator.validate(1 as unknown)).toThrow(`value "1" is not valid; value is not even`)
        expect(() => validator.validate(-53 as unknown)).toThrow(`value "-53" is not valid; value is not even`)
    })

    it('rejects values of wrong parity (expecting odd)', () => {
        const validator = new IntegerValidator({
            parity: 'odd'
        })
        expect(() => validator.validate(20 as unknown)).toThrow(`value "20" is not valid; value is not odd`)
        expect(() => validator.validate(0 as unknown)).toThrow(`value "0" is not valid; value is not odd`)
        expect(() => validator.validate(-6 as unknown)).toThrow(`value "-6" is not valid; value is not odd`)
    })

    it('rejects values where ensure callback fails', () => {
        const validator = new IntegerValidator({
            ensure: (number) => false
        })
        expect(() => validator.validate(20 as unknown)).toThrow(`value "20" is not valid; value did not pass a custom validation function`)
    })

    it('accepts valid integers within multiple constraints', () => {
        const validator = new IntegerValidator({
            parseStrings: true,
            min: -6,
            max: 10,
            parity: 'even',
            ensure: (number) => number + 1 === 2 + number - 1
        })
        expect(validator.validate(0 as unknown)).toBe(0)
        expect(validator.validate(-6 as unknown)).toBe(-6)
        expect(validator.validate(10 as unknown)).toBe(10)
        expect(validator.validate(4 as unknown)).toBe(4)
        expect(validator.validate('4' as unknown)).toBe(4)
    })
})