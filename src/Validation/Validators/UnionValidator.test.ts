import { describe, expect, it } from '@jest/globals'
import { EnumValidator } from './EnumValidator'
import { UnionValidator } from './UnionValidator'
import { IntegerValidator } from './IntegerValidator'
import { BooleanValidator } from './BooleanValidator'
import { ArrayValidator } from './ArrayValidator'
import { StringValidator } from './StringValidator'

describe('UnionValidator', () => {
    it('accepts unions of single validator', () => {
        const validator = new UnionValidator(new IntegerValidator({ parseStrings: true }))
        expect(validator.validate('123' as unknown)).toBe(123)
    })

    it('accepts unions of multiple validators', () => {
        const validator = new UnionValidator(
            new IntegerValidator,
            new BooleanValidator,
            new ArrayValidator(new StringValidator),
            new EnumValidator('yellow', 'blue')
        )
        expect(validator.validate(['abc', 'def'] as unknown)).toEqual(['abc', 'def'])
        expect(validator.validate(50 as unknown)).toBe(50)
        expect(validator.validate(false as unknown)).toBe(false)
        expect(validator.validate('blue' as unknown)).toBe('blue')
    })

    it('rejects value that is not valid instance of any type in union', () => {
        const validator = new UnionValidator(
            new IntegerValidator,
            new BooleanValidator,
            new ArrayValidator(new StringValidator),
            new EnumValidator('yellow', 'blue')
        )
        expect(() => validator.validate('green' as unknown)).toThrow(
            `value "green" did not match any member of union type. Component errors were: ` +
            `bad type; expected "number", got "string"; ` +
            `bad type; expected "boolean", got "string"; ` +
            `bad type; expected "array", got "string"; ` +
            `value "green" not a valid enum of (yellow | blue)`
        )
        expect(() => validator.validate(123.456 as unknown)).toThrow(
            `value "123.456" did not match any member of union type. Component errors were: ` +
            `value "123.456" not a valid integer; ` +
            `bad type; expected "boolean", got "number"; ` +
            `bad type; expected "array", got "number"; ` +
            `bad type; expected "string", got "number"`
        )
    })
})
