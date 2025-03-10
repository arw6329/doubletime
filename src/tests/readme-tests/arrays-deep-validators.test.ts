import { describe, expect, it } from "@jest/globals"
import { getTypes } from "../get-typescript-type"
import { compressWhitespace } from "../compress-whitespace"
import { object, array, int } from '#/entrypoint'

describe('README', () => {
    it('parses deeply nested array validators correctly', () => {
        /** @export typedObject */
        const typedObject = object({
            abc: array(array(array(int())))
        }).validate({
            abc: [[[1, 2], [3, 4]], [[5, 6]]]
        })

        expect(typedObject).toEqual({
            abc: [[[1, 2], [3, 4]], [[5, 6]]]
        })

        expect(getTypes(__filename).typedObject).toEqual(compressWhitespace(`{
            abc: number[][][];
        }`))
    })
})
