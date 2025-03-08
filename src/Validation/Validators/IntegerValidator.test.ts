import { describe, expect, it } from '@jest/globals'
import { IntegerValidator } from './IntegerValidator'

describe('IntegerValidator', () => {
    it('accepts valid integers', () => {
        const validator = new IntegerValidator
        expect(validator.validate(50 as unknown)).toEqual([50, null])
        expect(validator.validate(0 as unknown)).toEqual([0, null])
        expect(validator.validate(-50 as unknown)).toEqual([-50, null])
        expect(validator.validate(5.0 as unknown)).toEqual([5, null])
    })

    it('rejects non-number values', () => {
        const validator = new IntegerValidator
        const expectedResult = [null, 'value not of expected type']
        expect(validator.validate('abc' as unknown)).toEqual(expectedResult)
        expect(validator.validate(false as unknown)).toEqual(expectedResult)
        expect(validator.validate(null as unknown)).toEqual(expectedResult)
        expect(validator.validate({} as unknown)).toEqual(expectedResult)
    })

    it('rejects numeric strings', () => {
        const validator = new IntegerValidator
        const expectedResult = [null, 'value not of expected type']
        expect(validator.validate('5' as unknown)).toEqual(expectedResult)
    })

    it('rejects floating point values', () => {
        const validator = new IntegerValidator
        const expectedResult = [null, 'decimal values are not accepted']
        expect(validator.validate(5.5 as unknown)).toEqual(expectedResult)
        expect(validator.validate(-7.3 as unknown)).toEqual(expectedResult)
        expect(validator.validate(0.1 as unknown)).toEqual(expectedResult)
    })
})