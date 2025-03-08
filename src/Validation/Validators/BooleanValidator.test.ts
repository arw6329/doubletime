import { describe, expect, it } from '@jest/globals'
import { BooleanValidator } from './BooleanValidator'

describe('BooleanValidator', () => {
    it('accepts valid booleans', () => {
        const validator = new BooleanValidator
        expect(validator.validate(true as unknown)).toEqual([true, null])
        expect(validator.validate(false as unknown)).toEqual([false, null])
    })

    it('rejects non-boolean values when boolean-like is disabled', () => {
        const validator = new BooleanValidator(false)
        const expectedResult = [null, 'value not of expected type']
        expect(validator.validate('abc' as unknown)).toEqual(expectedResult)
        expect(validator.validate(null as unknown)).toEqual(expectedResult)
        expect(validator.validate({} as unknown)).toEqual(expectedResult)
    })

    it('rejects non-boolean values when boolean-like is enabled', () => {
        const validator = new BooleanValidator(true)
        const expectedResult = [null, 'value not of expected type']
        expect(validator.validate('abc' as unknown)).toEqual(expectedResult)
        expect(validator.validate(null as unknown)).toEqual(expectedResult)
        expect(validator.validate({} as unknown)).toEqual(expectedResult)
    })

    it('rejects boolean-like values when not enabled', () => {
        const validator = new BooleanValidator(false)
        const expectedResult = [null, 'value not of expected type']
        expect(validator.validate(0 as unknown)).toEqual(expectedResult)
        expect(validator.validate(1 as unknown)).toEqual(expectedResult)
        expect(validator.validate('0' as unknown)).toEqual(expectedResult)
        expect(validator.validate('1' as unknown)).toEqual(expectedResult)
        expect(validator.validate('false' as unknown)).toEqual(expectedResult)
        expect(validator.validate('true' as unknown)).toEqual(expectedResult)
        expect(validator.validate('  0  ' as unknown)).toEqual(expectedResult)
        expect(validator.validate('  1  ' as unknown)).toEqual(expectedResult)
        expect(validator.validate('  false  ' as unknown)).toEqual(expectedResult)
        expect(validator.validate('  true  ' as unknown)).toEqual(expectedResult)
    })

    it('accepts boolean-like values when enabled', () => {
        const validator = new BooleanValidator(true)
        expect(validator.validate(0 as unknown)).toEqual([false, null])
        expect(validator.validate(1 as unknown)).toEqual([true, null])
        expect(validator.validate('0' as unknown)).toEqual([false, null])
        expect(validator.validate('1' as unknown)).toEqual([true, null])
        expect(validator.validate('false' as unknown)).toEqual([false, null])
        expect(validator.validate('true' as unknown)).toEqual([true, null])
        expect(validator.validate('  0  ' as unknown)).toEqual([false, null])
        expect(validator.validate('  1  ' as unknown)).toEqual([true, null])
        expect(validator.validate('  false  ' as unknown)).toEqual([false, null])
        expect(validator.validate('  true  ' as unknown)).toEqual([true, null])
    })
})