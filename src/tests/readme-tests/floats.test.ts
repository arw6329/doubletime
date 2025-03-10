import { describe, expect, it } from "@jest/globals"
import { getTypes } from "../get-typescript-type"
import { compressWhitespace } from "../compress-whitespace"
import { object, float } from '#/entrypoint'

describe('README', () => {
    it('parses floats correctly', () => {
        /** @export typedObject */
        const typedObject = object({
            abc: 'float',
            def: 'float',
            ghi: float()
        }).validate({
            abc: 123,
            def: 0.5,
            ghi: -100.75
        })

        expect(typedObject).toEqual({
            abc: 123,
            def: 0.5,
            ghi: -100.75
        })

        expect(getTypes(__filename).typedObject).toEqual(compressWhitespace(`{
            abc: number;
            def: number;
            ghi: number;
        }`))

        expect(() => object({
            abc: 'float'
        }).validate({
            abc: '123.456'
        })).toThrow('bad type; expected "number", got "string"')
    })
})