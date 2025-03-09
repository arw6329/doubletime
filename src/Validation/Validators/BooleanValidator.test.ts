import { describe, expect, it } from '@jest/globals'
import { BooleanValidator } from './BooleanValidator'

describe('BooleanValidator', () => {
    it('accepts valid booleans', () => {
        const validator = new BooleanValidator
        expect(validator.validate(true as unknown)).toBe(true)
        expect(validator.validate(false as unknown)).toBe(false)
    })

    it('rejects non-boolean values when boolean-like is disabled', () => {
        const validator = new BooleanValidator(false)
        expect(() => validator.validate('abc' as unknown)).toThrow('bad type')
        expect(() => validator.validate(null as unknown)).toThrow('bad type')
        expect(() => validator.validate({} as unknown)).toThrow('bad type')
    })

    it('rejects non-boolean values when boolean-like is enabled', () => {
        const validator = new BooleanValidator(true)
        expect(() => validator.validate('abc' as unknown)).toThrow('not a valid boolean-like')
        expect(() => validator.validate(null as unknown)).toThrow('bad type')
        expect(() => validator.validate({} as unknown)).toThrow('bad type')
    })

    it('rejects boolean-like values when not enabled', () => {
        const validator = new BooleanValidator(false)
        expect(() => validator.validate(0 as unknown)).toThrow('bad type')
        expect(() => validator.validate(1 as unknown)).toThrow('bad type')
        expect(() => validator.validate('0' as unknown)).toThrow('bad type')
        expect(() => validator.validate('1' as unknown)).toThrow('bad type')
        expect(() => validator.validate('false' as unknown)).toThrow('bad type')
        expect(() => validator.validate('true' as unknown)).toThrow('bad type')
        expect(() => validator.validate('  0  ' as unknown)).toThrow('bad type')
        expect(() => validator.validate('  1  ' as unknown)).toThrow('bad type')
        expect(() => validator.validate('  false  ' as unknown)).toThrow('bad type')
        expect(() => validator.validate('  true  ' as unknown)).toThrow('bad type')
    })

    it('accepts boolean-like values when enabled', () => {
        const validator = new BooleanValidator(true)
        expect(validator.validate(0 as unknown)).toBe(false)
        expect(validator.validate(1 as unknown)).toBe(true)
        expect(validator.validate('0' as unknown)).toBe(false)
        expect(validator.validate('1' as unknown)).toBe(true)
        expect(validator.validate('false' as unknown)).toBe(false)
        expect(validator.validate('true' as unknown)).toBe(true)
        expect(validator.validate('  0  ' as unknown)).toBe(false)
        expect(validator.validate('  1  ' as unknown)).toBe(true)
        expect(validator.validate('  false  ' as unknown)).toBe(false)
        expect(validator.validate('  true  ' as unknown)).toBe(true)
    })
})