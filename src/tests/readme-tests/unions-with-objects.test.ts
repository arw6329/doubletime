import { describe, expect, it } from "@jest/globals"
import { choices, object, union } from '#/entrypoint'
import { getTypes } from "../get-typescript-type"
import { compressWhitespace } from "../compress-whitespace"

describe('README', () => {
    it('parses unions of objects correctly', () => {
        /** @export typedValue */
        const commentAction = union(
            object({
                action: choices('create'),
                text: 'string',
                'inReplyTo?': 'uuid'
            }),
            object({
                action: choices('edit'),
                commentId: 'uuid',
                text: 'string'
            })
        ).validate({
            action: 'edit',
            commentId: '5ca28d8c-a909-4900-9ffb-afb14a28dbd3',
            text: 'Hello world'
        })

        expect(commentAction).toEqual({
            action: 'edit',
            commentId: '5ca28d8c-a909-4900-9ffb-afb14a28dbd3',
            text: 'Hello world'
        })
        
        const types = getTypes(__filename)
        const uuidType = '`${string}-${string}-${string}-${string}-${string}`'
        expect(types.typedValue).toBe(compressWhitespace(`{
            action: "create";
            text: string;
            inReplyTo?: ${uuidType};
        } | {
            action: "edit";
            commentId: ${uuidType};
            text: string;
        }`))
    })
})
