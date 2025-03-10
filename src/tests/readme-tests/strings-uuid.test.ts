import { describe, expect, it } from "@jest/globals"
import { getTypes } from "../get-typescript-type"
import { compressWhitespace } from "../compress-whitespace"
import { object, uuid } from '#/entrypoint'

describe('README', () => {
    it('parses uuids correctly', () => {
        /** @export typedObject */
        const typedObject = object({
            abc: 'uuid',
            def: uuid()
        }).validate({
            abc: '5ca28d8c-a909-4900-9ffb-afb14a28dbd3',
            def: '114462d1-897d-460b-8f57-07d2f7970bc0'
        })

        expect(typedObject).toEqual({
            abc: '5ca28d8c-a909-4900-9ffb-afb14a28dbd3',
            def: '114462d1-897d-460b-8f57-07d2f7970bc0'
        })

        const uuidType = '`${string}-${string}-${string}-${string}-${string}`'
        expect(getTypes(__filename).typedObject).toEqual(compressWhitespace(`{
            abc: ${uuidType};
            def: ${uuidType};
        }`))
    })
})