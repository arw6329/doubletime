import { describe, expect, it } from "@jest/globals"
import { getTypes } from "../get-typescript-type"
import { compressWhitespace } from "../compress-whitespace"
import { object, array, int } from '#/entrypoint'

describe('README', () => {
    it('parses array validators correctly', () => {
        /** @export typedObject */
        const typedObject = object({
            abc: array(int())
        }).validate({
            abc: [1, 2]
        })

        expect(typedObject).toEqual({
            abc: [1, 2]
        })

        expect(getTypes(__filename).typedObject).toEqual(compressWhitespace(`{
            abc: number[];
        }`))
    })
})
