import { describe, expect, it } from '@jest/globals'
import { StringValidator } from './StringValidator'

describe('StringValidator', () => {
    it('accepts valid string', () => {
        const validator = new StringValidator
        expect(validator.validate('abc' as unknown)).toBe('abc')
        expect(validator.validate('Holy cow!' as unknown)).toBe('Holy cow!')
    })

    it('rejects non-string values', () => {
        const validator = new StringValidator
        const expectedResult = [null, 'value not of expected type']
        expect(() => validator.validate(123 as unknown)).toThrow('bad type')
        expect(() => validator.validate(false as unknown)).toThrow('bad type')
        expect(() => validator.validate(null as unknown)).toThrow('bad type')
        expect(() => validator.validate({} as unknown)).toThrow('bad type')
    })

    it('trims strings when specified', () => {
        const validator = new StringValidator({
            trim: true
        })
        expect(validator.validate('   abc   def   ' as unknown)).toBe('abc   def')
        expect(validator.validate('123' as unknown)).toBe('123')
    })

    it('does not trim strings when not specified', () => {
        const validator = new StringValidator
        expect(validator.validate('   abc   def   ' as unknown)).toBe('   abc   def   ')
        expect(validator.validate('123' as unknown)).toBe('123')
    })

    it('accepts empty strings when specified', () => {
        const validator = new StringValidator({
            trim: true
        })
        expect(validator.validate('' as unknown)).toBe('')
        expect(validator.validate('       ' as unknown)).toBe('')
    })

    it('rejects empty strings when specified/strings under min length', () => {
        const validator = new StringValidator({
            minLength: 1,
            trim: true
        })
        expect(() => validator.validate('' as unknown)).toThrow('value "" is not valid; minimum accepted length is 1')
        expect(() => validator.validate('       ' as unknown)).toThrow('value "" is not valid; minimum accepted length is 1')
    })

    it('rejects strings above max length', () => {
        const validator = new StringValidator({
            maxLength: 10
        })
        expect(() => validator.validate('1234567890x' as unknown)).toThrow(`value "1234567890x" is not valid; maximum accepted length is 10`)
    })

    it('rejects strings where ensure callback fails', () => {
        const validator = new StringValidator({
            ensure: (string) => false
        })
        expect(() => validator.validate('abc' as unknown)).toThrow(`value "abc" is not valid; value did not pass a custom validation function`)
    })

    it('rejects strings when regex match fails', () => {
        const validator = new StringValidator({
            match: /^[a-z]+$/i
        })
        expect(() => validator.validate('abc123' as unknown)).toThrow(`value "abc123" is not valid; input must match regular expression /^[a-z]+$/i`)
    })

    it('transforms strings correctly when transform is specified', () => {
        const validator = new StringValidator({
            transform: (string) => string.toUpperCase()
        })
        expect(validator.validate('abc123' as unknown)).toBe(`ABC123`)
    })

    it('accepts valid strings within multiple constraints', () => {
        const validator = new StringValidator({
            minLength: 5,
            maxLength: 10,
            trim: true,
            match: /^(?:abc|def)-[0-9]+$/,
            ensure: (string) => parseInt(string.split('-')[1]) > 100,
            transform: (string) => string.split('').reverse().join('')
        })
        expect(validator.validate('abc-123' as unknown)).toBe('321-cba')
        expect(validator.validate('  def-098765  ' as unknown)).toBe('567890-fed')
    })
})