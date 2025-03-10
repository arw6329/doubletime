import { describe, expect, it } from "@jest/globals"
import { getTypes } from "../get-typescript-type"
import { compressWhitespace } from "../compress-whitespace"
import { object } from '#/entrypoint'

describe('README', () => {
    it('parses basic nullable shorthand type specifiers correctly', () => {
        /** @export typedObject */
        const typedObject = object({
            abc: 'int?',
            def: 'non-empty string?',
            ghi: 'boolean?'
        }).validate({
            abc: null,
            def: 'abc',
            ghi: false
        })

        expect(typedObject).toEqual({
            abc: null,
            def: 'abc',
            ghi: false
        })

        expect(getTypes(__filename).typedObject).toEqual(compressWhitespace(`{
            abc: number | null;
            def: string | null;
            ghi: boolean | null;
        }`))
    })
})
