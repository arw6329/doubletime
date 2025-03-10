import { describe, expect, it } from "@jest/globals"
import { getTypes } from "../get-typescript-type"
import { compressWhitespace } from "../compress-whitespace"
import { object, string } from '#/entrypoint'

describe('README', () => {
    it('parses basic strings correctly', () => {
        /** @export typedObject */
        const typedObject = object({
            abc: 'string',
            def: string()
        }).validate({
            abc: 'Hello',
            def: 'world'
        })

        expect(typedObject).toEqual({
            abc: 'Hello',
            def: 'world'
        })

        expect(getTypes(__filename).typedObject).toEqual(compressWhitespace(`{
            abc: string;
            def: string;
        }`))
    })
})