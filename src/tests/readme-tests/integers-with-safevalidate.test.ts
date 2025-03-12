import { describe, expect, it } from "@jest/globals"
import { getTypes } from "../get-typescript-type"
import { compressWhitespace } from "../compress-whitespace"
import { int } from '#/entrypoint'

describe('README', () => {
    it('handles calls to safeValidate correctly', () => {
        const types = getTypes(__filename)

        console.log(types)
        const { value: typedValue1, error: error1 } = int().safeValidate('whoops')
        
        {
            /** @export typedValue1 */
            const x = typedValue1
        }

        {
            /** @export error1 */
            const x = error1
        }

        expect(typedValue1).toBe(undefined)
        expect(error1).toEqual(new Error('bad type; expected "number", got "string"'))

        expect(types.typedValue1).toEqual(compressWhitespace(`number | undefined`))
        expect(types.error1).toEqual(compressWhitespace(`Error | undefined`))

        const { value: typedValue2, error: error2 } = int().safeValidate(123 as unknown)

        {
            /** @export typedValue2 */
            const x = typedValue2
        }

        {
            /** @export error2 */
            const x = error2
        }

        expect(typedValue2).toBe(123)
        expect(error2).toEqual(undefined)

        expect(types.typedValue2).toEqual(compressWhitespace(`number | undefined`))
        expect(types.error2).toEqual(compressWhitespace(`Error | undefined`))
    })
})