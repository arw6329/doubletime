import { describe, expect, it } from "@jest/globals"
import { getTypes } from "../get-typescript-type"
import { compressWhitespace } from "../compress-whitespace"
import { object, string } from '#/entrypoint'

describe('README', () => {
    it('parses trimmed strings correctly', () => {
        /** @export typedObject1 */
        const typedObject1 = object({
            abc: 'trimmed string',
            def: 'trimmed string'
        }).validate({
            abc: '   Hello   ',
            def: 'world'
        })

        expect(typedObject1).toEqual({
            abc: 'Hello',
            def: 'world'
        })

        expect(getTypes(__filename).typedObject1).toEqual(compressWhitespace(`{
            abc: string;
            def: string;
        }`))

        expect(() => object({
            abc: 'trimmed non-empty string',
            def: 'trimmed non-empty string'
        }).validate({
            abc: '   Hello   ',
            def: '       '
        })).toThrow('empty string is not accepted')
    })
})