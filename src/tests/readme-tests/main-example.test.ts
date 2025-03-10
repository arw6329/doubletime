import { describe, expect, it } from "@jest/globals"
import { getTypes } from "../get-typescript-type"
import { compressWhitespace } from "../compress-whitespace"
import { object } from '#/entrypoint'

describe('README', () => {
    it('parses the main example from the README correctly', () => {
        const untypedObject: unknown = JSON.parse(`
            {
                "profileId": "5ca28d8c-a909-4900-9ffb-afb14a28dbd3",
                "name": "Eva Williams",
                "age": 23,
                "bio": null,
                "comments": [
                    {
                        "text": "Easily parse objects with compile-time type safety!"
                    },
                    {
                        "text": "Perfect for parsing API request bodies",
                        "edits": [
                            {
                                "text": "Or providing intellisense hints for db data while enforcing expected schemas at runtime"
                            }
                        ]
                    }
                ]
            }
        `)

        /** @export typedObject */
        const typedObject = object({
            profileId: 'uuid',
            name: 'string',
            age: 'int',
            bio: 'string?',
            comments: [{
                text: 'string',
                'edits?': [{
                    text: 'string'
                }]
            }]
        }).validate(structuredClone(untypedObject))

        expect(typedObject).toEqual(structuredClone(untypedObject))

        const uuidType = '`${string}-${string}-${string}-${string}-${string}`'
        expect(getTypes(__filename).typedObject).toEqual(compressWhitespace(`{
            profileId: ${uuidType};
            name: string;
            age: number;
            bio: string | null;
            comments: {
                text: string;
                edits?: {
                    text: string;
                }[];
            }[];
        }`))
    })
})