import { describe, expect, it } from '@jest/globals'
import { ArrayValidator } from './ArrayValidator'
import { IntegerValidator } from './IntegerValidator'
import { BooleanValidator } from './BooleanValidator'
import { StringValidator } from './StringValidator'
import { NoopValidator } from './NoopValidator'

describe('ArrayValidator', () => {
    it('accepts arrays of integers', () => {
        const validator = new ArrayValidator(new IntegerValidator)
        expect(validator.validate([1, 2, 3] as unknown)).toEqual([1, 2, 3])
        expect(validator.validate([] as unknown)).toEqual([])
    })

    it('accepts arrays of booleans', () => {
        const validator = new ArrayValidator(new BooleanValidator)
        expect(validator.validate([true, false] as unknown)).toEqual([true, false])
        expect(validator.validate([] as unknown)).toEqual([])
    })

    it('accepts arrays of strings', () => {
        const validator = new ArrayValidator(new StringValidator(false, false))
        expect(validator.validate(['abc', 'def'] as unknown)).toEqual(['abc', 'def'])
        expect(validator.validate([] as unknown)).toEqual([])
    })

    it('rejects non-array values', () => {
        const validator = new ArrayValidator(new NoopValidator)
        expect(() => validator.validate('abc' as unknown)).toThrow('bad type')
        expect(() => validator.validate(0 as unknown)).toThrow('bad type')
        expect(() => validator.validate(1 as unknown)).toThrow('bad type')
        expect(() => validator.validate(null as unknown)).toThrow('bad type')
        expect(() => validator.validate({} as unknown)).toThrow('bad type')
    })

    it('rejects arrays of wrong type', () => {
        const validator = new ArrayValidator(new StringValidator(false, false))
        expect(() => validator.validate(['abc', 'def', 123] as unknown)).toThrow('bad type')
    })
})