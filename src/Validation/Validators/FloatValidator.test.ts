import { describe, expect, it } from '@jest/globals'
import { FloatValidator } from './FloatValidator'

describe('FloatValidator', () => {
    it('accepts valid numbers', () => {
        const validator = new FloatValidator
        expect(validator.validate(5 as unknown)).toEqual([5, null])
        expect(validator.validate(0.043 as unknown)).toEqual([0.043, null])
        expect(validator.validate(-100.7 as unknown)).toEqual([-100.7, null])
        expect(validator.validate(36.89 as unknown)).toEqual([36.89, null])
    })

    it('rejects non-number values', () => {
        const validator = new FloatValidator
        const expectedResult = [null, 'value not of expected type']
        expect(validator.validate('abc' as unknown)).toEqual(expectedResult)
        expect(validator.validate(false as unknown)).toEqual(expectedResult)
        expect(validator.validate(null as unknown)).toEqual(expectedResult)
        expect(validator.validate({} as unknown)).toEqual(expectedResult)
    })

    it('rejects numeric strings', () => {
        const validator = new FloatValidator
        const expectedResult = [null, 'value not of expected type']
        expect(validator.validate('5' as unknown)).toEqual(expectedResult)
        expect(validator.validate('100.7' as unknown)).toEqual(expectedResult)
    })
})