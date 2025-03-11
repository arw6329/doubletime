import { describe, expect, it } from "@jest/globals"
import { getTypes } from "../get-typescript-type"
import { compressWhitespace } from "../compress-whitespace"
import { object } from '#/entrypoint'

describe('README', () => {
    it('parses non-empty strings correctly', () => {
        const validator = object({
            abc: 'non-empty string'
        })
        
        /** @export typedObject1 */
        const typedObject1 = validator.validate({
            abc: 'Some string here'
        })

        expect(typedObject1).toEqual({
            abc: 'Some string here'
        })

        expect(getTypes(__filename).typedObject1).toEqual(compressWhitespace(`{
            abc: string;
        }`))

        expect(() => validator.validate({
            abc: ''
        })).toThrow('value "" is not valid; minimum accepted length is 1')
    })
})