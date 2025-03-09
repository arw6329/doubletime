import { describe, expect, it } from '@jest/globals'
import { validate } from './entrypoint'
import { concreteSchema } from './tests/test-objects/concrete-schema'
import { testObject } from './tests/test-objects/test-object'
import { expectedObject } from './tests/test-objects/expected-object'
import { getTypes } from './tests/get-typescript-type'
import fs from 'fs'
import path from 'path'

describe('object-schema-validation package', () => {
    it('accepts valid objects', () => {
        /** @export typedObject */
        const typedObject = validate(concreteSchema, testObject() as unknown)
        expect(typedObject).toEqual(expectedObject())
    })

    it('infers type correctly', () => {
        const expectedType = fs.readFileSync(
            path.join(__dirname, 'tests', 'test-objects', 'expected-type.txt')
        ).toString('utf-8').replaceAll(/\s+/g, ' ')
        expect(getTypes(path.join(__dirname, 'entrypoint.test.ts')).typedObject).toBe(expectedType)
    })
})
