import { describe, expect, it } from '@jest/globals'
import { StringValidator } from './StringValidator'

describe('StringValidator', () => {
    it('accepts valid string', () => {
        const validator = new StringValidator(true, false)
        expect(validator.validate('abc' as unknown)).toBe('abc')
        expect(validator.validate('Holy cow!' as unknown)).toBe('Holy cow!')
    })

    it('rejects non-string values', () => {
        const validator = new StringValidator(true, false)
        const expectedResult = [null, 'value not of expected type']
        expect(() => validator.validate(123 as unknown)).toThrow('bad type')
        expect(() => validator.validate(false as unknown)).toThrow('bad type')
        expect(() => validator.validate(null as unknown)).toThrow('bad type')
        expect(() => validator.validate({} as unknown)).toThrow('bad type')
    })

    it('trims strings when specified', () => {
        const validator = new StringValidator(true, true)
        expect(validator.validate('   abc   def   ' as unknown)).toBe('abc   def')
        expect(validator.validate('123' as unknown)).toBe('123')
    })

    it('does not trim strings when not specified', () => {
        const validator = new StringValidator(true, false)
        expect(validator.validate('   abc   def   ' as unknown)).toBe('   abc   def   ')
        expect(validator.validate('123' as unknown)).toBe('123')
    })

    it('accepts empty strings when specified', () => {
        const validator = new StringValidator(true, true)
        expect(validator.validate('' as unknown)).toBe('')
        expect(validator.validate('       ' as unknown)).toBe('')
    })

    it('rejects empty strings when specified', () => {
        const validator = new StringValidator(false, true)
        expect(() => validator.validate('' as unknown)).toThrow('empty string is not accepted')
        expect(() => validator.validate('       ' as unknown)).toThrow('empty string is not accepted')
    })
})