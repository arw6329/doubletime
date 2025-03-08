import { describe, expect, it } from '@jest/globals'
import { StringValidator } from './StringValidator'

describe('StringValidator', () => {
    it('accepts valid string', () => {
        const validator = new StringValidator(true, false)
        expect(validator.validate('abc' as unknown)).toEqual(['abc', null])
        expect(validator.validate('Holy cow!' as unknown)).toEqual(['Holy cow!', null])
    })

    it('rejects non-string values', () => {
        const validator = new StringValidator(true, false)
        const expectedResult = [null, 'value not of expected type']
        expect(validator.validate(123 as unknown)).toEqual(expectedResult)
        expect(validator.validate(false as unknown)).toEqual(expectedResult)
        expect(validator.validate(null as unknown)).toEqual(expectedResult)
        expect(validator.validate({} as unknown)).toEqual(expectedResult)
    })

    it('trims strings when specified', () => {
        const validator = new StringValidator(true, true)
        expect(validator.validate('   abc   def   ' as unknown)).toEqual(['abc   def', null])
        expect(validator.validate('123' as unknown)).toEqual(['123', null])
    })

    it('does not trim strings when not specified', () => {
        const validator = new StringValidator(true, false)
        expect(validator.validate('   abc   def   ' as unknown)).toEqual(['   abc   def   ', null])
        expect(validator.validate('123' as unknown)).toEqual(['123', null])
    })

    it('accepts empty strings when specified', () => {
        const validator = new StringValidator(true, true)
        expect(validator.validate('' as unknown)).toEqual(['', null])
        expect(validator.validate('       ' as unknown)).toEqual(['', null])
    })

    it('rejects empty strings when specified', () => {
        const validator = new StringValidator(false, true)
        const expectedResult = [null, 'value must not be empty']
        expect(validator.validate('' as unknown)).toEqual(expectedResult)
        expect(validator.validate('       ' as unknown)).toEqual(expectedResult)
    })
})