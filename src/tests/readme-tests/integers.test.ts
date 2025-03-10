import { describe, expect, it } from "@jest/globals"
import { getTypes } from "../get-typescript-type"
import { compressWhitespace } from "../compress-whitespace"
import { object, int } from '#/entrypoint'

describe('README', () => {
    it('parses integers correctly', () => {
        /** @export typedObject */
        const typedObject = object({
            abc: 'int',
            def: 'integer',
            ghi: int()
        }).validate({
            abc: 123,
            def: 456.0,
            ghi: -789
        })

        expect(typedObject).toEqual({
            abc: 123,
            def: 456.0,
            ghi: -789
        })

        expect(getTypes(__filename).typedObject).toEqual(compressWhitespace(`{
            abc: number;
            def: number;
            ghi: number;
        }`))

        expect(() => object({
            abc: 'int'
        }).validate({
            abc: '123'
        })).toThrow('bad type; expected "number", got "string"')
    })
})