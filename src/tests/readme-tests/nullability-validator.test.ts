import { describe, expect, it } from "@jest/globals"
import { getTypes } from "../get-typescript-type"
import { compressWhitespace } from "../compress-whitespace"
import { object, maybe, int } from '#/entrypoint'

describe('README', () => {
    it('parses nullable shorthand array type specifiers correctly', () => {
        /** @export typedObject */
        const typedObject = object({
            abc: maybe(int())
        }).validate({
            abc: null
        })

        expect(typedObject).toEqual({
            abc: null
        })

        expect(getTypes(__filename).typedObject).toEqual(compressWhitespace(`{
            abc: number | null;
        }`))
    })
})
