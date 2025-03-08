import { describe, expect, it } from '@jest/globals'
import { validate } from './entrypoint'
import { concreteSchema } from './tests/test-objects/concrete-schema'
import { testObject } from './tests/test-objects/test-object'
import { expectedObject } from './tests/test-objects/expected-object'

describe('object-schema-validation package', () => {
    it('accepts valid objects', () => {
        const typedObject = validate(concreteSchema, testObject() as unknown)
        expect(typedObject).toEqual(expectedObject())
    })
})
