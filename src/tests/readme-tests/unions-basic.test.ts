import { describe, expect, it } from "@jest/globals"
import { int, string, union } from '#/entrypoint'
import { getTypes } from "../get-typescript-type"

describe('README', () => {
    it('parses unions correctly', () => {
        const validator = union(int(), string())

        /** @export typedValue1 */
        const typedValue1 = validator.validate(123)
        /** @export typedValue2 */
        const typedValue2 = validator.validate('$456')

        expect(typedValue1).toBe(123)
        expect(typedValue2).toBe('$456')
        
        const types = getTypes(__filename)
        expect(types.typedValue1).toBe('string | number')
        expect(types.typedValue2).toBe('string | number')

        expect(() => validator.validate(false)).toThrow('value "false" did not match any member of union type. Component errors were: bad type; expected "number", got "boolean"; bad type; expected "string", got "boolean"')
    })
})
