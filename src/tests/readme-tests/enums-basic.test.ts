import { describe, expect, it } from "@jest/globals"
import { choice } from '#/entrypoint'
import { getTypes } from "../get-typescript-type"

describe('README', () => {
    it('parses string enumerations correctly', () => {
        const validator = choice('one', 'two', 'three', 'four')

        /** @export typedValue */
        const typedValue = validator.validate('three')

        expect(typedValue).toBe('three')
        
        const types = getTypes(__filename)
        expect(types.typedValue).toBe('"one" | "two" | "three" | "four"')

        expect(() => validator.validate('five')).toThrow('value "five" not a valid enum of (one | two | three | four)')
    })
})
