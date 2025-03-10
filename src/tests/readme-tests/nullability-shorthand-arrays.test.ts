import { describe, expect, it } from "@jest/globals"
import { getTypes } from "../get-typescript-type"
import { compressWhitespace } from "../compress-whitespace"
import { object } from '#/entrypoint'

describe('README', () => {
    it('parses nullable shorthand array type specifiers correctly', () => {
        /** @export typedObject */
        const typedObject = object({
            abc: 'int?[]',
            def: 'int[]?',
            ghi: 'int?[]?'
        }).validate({
            abc: [1, null, 3],
            def: null,
            ghi: null
        })

        expect(typedObject).toEqual({
            abc: [1, null, 3],
            def: null,
            ghi: null
        })

        expect(getTypes(__filename).typedObject).toEqual(compressWhitespace(`{
            abc: (number | null)[];
            def: number[] | null;
            ghi: (number | null)[] | null;
        }`))
    })
})
