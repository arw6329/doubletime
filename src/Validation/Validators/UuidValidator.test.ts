import { describe, expect, it } from '@jest/globals'
import { UuidValidator } from './UuidValidator'

describe('UuidValidator', () => {
    it('accepts valid uuid', () => {
        const validator = new UuidValidator
        const uuid = crypto.randomUUID()
        expect(validator.validate(uuid as unknown)).toBe(uuid)
    })

    it('rejects non-string values', () => {
        const validator = new UuidValidator
        expect(() => validator.validate(123 as unknown)).toThrow('bad type')
        expect(() => validator.validate(false as unknown)).toThrow('bad type')
        expect(() => validator.validate(null as unknown)).toThrow('bad type')
        expect(() => validator.validate({} as unknown)).toThrow('bad type')
    })

    it('rejects non-uuid strings', () => {
        const validator = new UuidValidator
        expect(() => validator.validate('abc' as unknown)).toThrow('not a valid uuid')
        expect(() => validator.validate('' as unknown)).toThrow('empty string is not accepted')
    })
})