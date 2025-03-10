import { describe, expect, it } from "@jest/globals"
import { object } from '#/entrypoint'
import { getTypes } from "../get-typescript-type"
import { compressWhitespace } from "../compress-whitespace"

describe('README', () => {
    it('parses concrete schemas using shorthand string type specifiers', () => {
        const validator = object({
            name: 'string',
            age: 'int',
            address: {
                street: 'string',
                city: 'string',
                zip: 'int'
            }
        })

        const untypedObject = JSON.parse(`{
            "name": "Jane Doe",
            "age": 21,
            "address": {
                "street": "1234 Alexander Ave",
                "city": "Gotham City",
                "zip": 12345
            }
        }`)

        /** @export typedObject */
        const typedObject = validator.validate(structuredClone(untypedObject))

        expect(typedObject).toEqual(structuredClone(untypedObject))

        expect(getTypes(__filename).typedObject).toEqual(compressWhitespace(`{
            name: string;
            age: number;
            address: {
                street: string;
                city: string;
                zip: number;
            };
        }`))
    })
})