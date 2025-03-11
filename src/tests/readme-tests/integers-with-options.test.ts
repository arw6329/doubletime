import { describe, expect, it } from "@jest/globals"
import { int } from '#/entrypoint'

describe('README', () => {
    it('parses integers with options correctly', () => {
        const validator = int({
            parseStrings: true,
            min: -6,
            max: 10,
            parity: 'even',
            ensure: (number) => number + 1 === 2 + number - 1
        })

        expect(validator.validate(0)).toBe(0)
        expect(validator.validate(-6)).toBe(-6)
        expect(validator.validate(10)).toBe(10)
        expect(validator.validate('4')).toBe(4)

        expect(() => validator.validate(15)).toThrow('value "15" is not valid; maximum accepted value is 10')
    })
})