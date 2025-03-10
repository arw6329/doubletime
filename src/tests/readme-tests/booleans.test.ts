import { describe, expect, it } from "@jest/globals"
import { getTypes } from "../get-typescript-type"
import { compressWhitespace } from "../compress-whitespace"
import { object, bool } from '#/entrypoint'

describe('README', () => {
    it('parses booleans correctly', () => {
        /** @export typedObject */
        const typedObject = object({
            abc: 'boolean',
            def: bool(),
        }).validate({
            abc: true,
            def: false
        })

        expect(typedObject).toEqual({
            abc: true,
            def: false
        })

        expect(getTypes(__filename).typedObject).toEqual(compressWhitespace(`{
            abc: boolean;
            def: boolean;
        }`))
    })
})