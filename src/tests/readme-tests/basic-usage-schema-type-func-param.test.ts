import { describe, expect, it } from "@jest/globals"
import { object, type Schema } from '#/entrypoint'
import { getTypes } from "../get-typescript-type"
import { compressWhitespace } from "../compress-whitespace"

describe('README', () => {
    it('enforces type of function parameter correctly from Schema<concrete schema>', () => {
        const personSchema = {
            name: 'string',
            age: 'int',
            address: {
                street: 'string',
                city: 'string',
                zip: 'int'
            }
        } as const
        
        type Person = Schema<typeof personSchema>
        
        function printPersonDetails(
            /** @export personParam */
            person: Person
        ) {
            void `${person.name} lives in ${person.address.city}`
        }
        
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
        const person = object(personSchema).validate(untypedObject)
        
        printPersonDetails(person)

        expect(person).toEqual(structuredClone(untypedObject))

        const types = getTypes(__filename)
        const expectedType = compressWhitespace(`{
            readonly name: string;
            readonly age: number;
            readonly address: {
                readonly street: string;
                readonly city: string;
                readonly zip: number;
            };
        }`)
        expect(types.typedObject).toEqual(expectedType)
        expect(types.personParam).toEqual(expectedType)
    })
})