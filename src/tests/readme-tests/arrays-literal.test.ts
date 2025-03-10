import { describe, expect, it } from "@jest/globals"
import { getTypes } from "../get-typescript-type"
import { compressWhitespace } from "../compress-whitespace"
import { object, bool } from '#/entrypoint'

describe('README', () => {
    it('parses arrays using array literal syntax correctly', () => {
        /** @export typedObject */
        const typedObject = object({
            abc: [ 'int' ],
            def: [ 'non-empty string' ],
            ghi: [ bool() ]
        }).validate({
            abc: [1, 2],
            def: ['abc', 'def'],
            ghi: [true, false]
        })

        expect(typedObject).toEqual({
            abc: [1, 2],
            def: ['abc', 'def'],
            ghi: [true, false]
        })

        expect(getTypes(__filename).typedObject).toEqual(compressWhitespace(`{
            abc: number[];
            def: string[];
            ghi: boolean[];
        }`))
    })
})