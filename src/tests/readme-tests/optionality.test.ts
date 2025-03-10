import { describe, expect, it } from "@jest/globals"
import { getTypes } from "../get-typescript-type"
import { compressWhitespace } from "../compress-whitespace"
import { object, nullable } from '#/entrypoint'

describe('README', () => {
    it('parses optional keys correctly', () => {
        const validator = object({
            'optionalString?': 'string',
            'optionalInt?': 'int'
        })

        /** @export typedObject1 */
        const typedObject1 = validator.validate({
            optionalString: 'String was provided'
        })

        expect(typedObject1).toEqual({
            optionalString: 'String was provided'
        })

        expect(getTypes(__filename).typedObject1).toEqual(compressWhitespace(`{
            optionalString?: string;
            optionalInt?: number;
        }`))

        /** @export typedObject2 */
        const typedObject2 = validator.validate({
            optionalInt: 123
        })

        expect(typedObject2).toEqual({
            optionalInt: 123
        })

        expect(getTypes(__filename).typedObject2).toEqual(compressWhitespace(`{
            optionalString?: string;
            optionalInt?: number;
        }`))
    })
})
