import { describe, expect, it } from '@jest/globals'
import { UuidValidator } from './UuidValidator'

describe('UuidValidator', () => {
    it('accepts valid uuid', () => {
        const validator = new UuidValidator
        const uuid = crypto.randomUUID()
        expect(validator.validate(uuid as unknown)).toEqual([uuid, null])
    })

    it('rejects non-string values', () => {
        const validator = new UuidValidator
        const expectedResult = [null, 'value not of expected type']
        expect(validator.validate(123 as unknown)).toEqual(expectedResult)
        expect(validator.validate(false as unknown)).toEqual(expectedResult)
        expect(validator.validate(null as unknown)).toEqual(expectedResult)
        expect(validator.validate({} as unknown)).toEqual(expectedResult)
    })

    it('rejects non-uuid strings', () => {
        const validator = new UuidValidator
        expect(validator.validate('abc' as unknown)).toEqual([null, 'value was not a valid uuid'])
        expect(validator.validate('' as unknown)).toEqual([null, 'value must not be empty'])
    })
})