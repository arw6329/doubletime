import { describe, expect, it } from "@jest/globals"
import { getTypes } from "../get-typescript-type"
import { compressWhitespace } from "../compress-whitespace"
import { object, nullable } from '#/entrypoint'

describe('README', () => {
    it('parses objects marked nullable with [nullable] symbol correctly', () => {
        const validator = object({
            someObject: {
                [nullable]: true,
                a: 'int',
                b: 'string'
            }
        })

        /** @export typedObject1 */
        const typedObject1 = validator.validate({
            someObject: {
                a: 123,
                b: 'def'
            }
        })

        expect(typedObject1).toEqual({
            someObject: {
                a: 123,
                b: 'def'
            }
        })

        expect(getTypes(__filename).typedObject1).toEqual(compressWhitespace(`{
            someObject: {
                a: number;
                b: string; 
            } | null;
        }`))

        /** @export typedObject2 */
        const typedObject2 = validator.validate({
            someObject: null
        })

        expect(typedObject2).toEqual({
            someObject: null
        })

        expect(getTypes(__filename).typedObject2).toEqual(compressWhitespace(`{
            someObject: {
                a: number;
                b: string; 
            } | null;
        }`))
    })
})
