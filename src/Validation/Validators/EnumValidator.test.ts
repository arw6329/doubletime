import { describe, expect, it } from '@jest/globals'
import { EnumValidator } from './EnumValidator'

describe('EnumValidator', () => {
    it('accepts enums of single value', () => {
        const validator = new EnumValidator('one')
        expect(validator.validate('one' as unknown)).toBe('one')
    })

    it('accepts enums of multiple values', () => {
        const validator = new EnumValidator('one', 'two', 'three', 'four')
        expect(validator.validate('three' as unknown)).toBe('three')
        expect(validator.validate('four' as unknown)).toBe('four')
    })

    it('rejects non-enumerated string', () => {
        const validator = new EnumValidator('one', 'two', 'three', 'four')
        expect(() => validator.validate('five' as unknown)).toThrow('value "five" not a valid enum of (one | two | three | four)')
    })
})
