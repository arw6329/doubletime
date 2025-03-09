import { describe, expect, it } from '@jest/globals'
import { nullable, validate } from './entrypoint'
import { concreteSchema } from './tests/test-objects/concrete-schema'
import { testObject } from './tests/test-objects/test-object'
import { expectedObject } from './tests/test-objects/expected-object'
import { getTypes } from './tests/get-typescript-type'
import fs from 'fs'
import path from 'path'
import { Schema } from './Validation/SchemaValidation'
import { IntegerValidator } from './Validation/Validators/IntegerValidator'
import { BooleanValidator } from './Validation/Validators/BooleanValidator'

describe('object-schema-validation package', () => {
    const types = getTypes(path.join(__dirname, 'entrypoint.test.ts'))

    it('accepts valid objects', () => {
        /** @export typedObject */
        const typedObject = validate(concreteSchema, testObject() as unknown)
        expect(typedObject).toEqual(expectedObject())
    })

    it('infers type correctly', () => {
        const expectedType = fs.readFileSync(
            path.join(__dirname, 'tests', 'test-objects', 'expected-type.txt')
        ).toString('utf-8').replaceAll(/\s+/g, ' ')
        expect(types['typedObject']).toBe(expectedType)
    })

    it('types schemas of non-object concrete schemas as never', () => {
        /** @export badConcreteSchema1 */
        let test1: Schema<null>
        expect(types['badConcreteSchema1']).toBe('never')

        /** @export badConcreteSchema2 */
        let test2: Schema<1>
        expect(types['badConcreteSchema2']).toBe('never')

        /** @export badConcreteSchema3 */
        let test3: Schema<'abc'>
        expect(types['badConcreteSchema3']).toBe('never')

        /** @export badConcreteSchema4 */
        let test4: Schema<[]>
        expect(types['badConcreteSchema4']).toBe('never')

        /** @export badConcreteSchema5 */
        let test5: Schema<true>
        expect(types['badConcreteSchema5']).toBe('never')
    })

    it('types schemas of concrete schemas with too many array members as never', () => {
        /** @export badArraySpec */
        let test: Schema<{
            a: ['int', 'boolean']
        }>
        expect(types['badArraySpec']).toBe('never')
    })

    it('types schemas of concrete schemas with bad key values as never', () => {
        /** @export badConcreteSchemaValue1 */
        let test1: Schema<{
            a: 'abc'
        }>
        expect(types['badConcreteSchemaValue1']).toBe('never')

        /** @export badConcreteSchemaValue2 */
        let test2: Schema<{
            a: 123
        }>
        expect(types['badConcreteSchemaValue2']).toBe('never')

        /** @export badConcreteSchemaValue3 */
        let test3: Schema<{
            a: null
        }>
        expect(types['badConcreteSchemaValue3']).toBe('never')

        /** @export badConcreteSchemaValue4 */
        let test4: Schema<{
            a: 'int',
            b: 'abc'
        }>
        expect(types['badConcreteSchemaValue4']).toBe('never')

        /** @export badConcreteSchemaValue5 */
        let test5: Schema<{
            a: {
                b: {
                    c: 'what'
                }
            }
        }>
        expect(types['badConcreteSchemaValue5']).toBe('never')

        /** @export badConcreteSchemaValue6 */
        let test6: Schema<{
            [nullable]: true
            a: 'abc'
        }>
        expect(types['badConcreteSchemaValue6']).toBe('never')
    })

    it('types nested objects correctly', () => {
        /** @export typedNestedObject */
        const typedObject = validate({
            a: {
                b: 'int'
            }
        }, {
            a: {
                b: 1
            }
        } as unknown)
        expect(types['typedNestedObject']).toEqual('{ a: { b: number; }; }')
    })

    it('types deeply nested objects correctly', () => {
        /** @export typedDeepNestedObject */
        const typedObject = validate({
            a: {
                b: {
                    c: 'int'
                }
            }
        }, {
            a: {
                b: {
                    c: 1
                }
            }
        } as unknown)
        expect(types['typedDeepNestedObject']).toEqual('{ a: { b: { c: number; }; }; }')
    })

    it('types a mix of shorthand validators, explicit validators, and multiple array syntaxes correctly', () => {
        /** @export tempTestNewSchema */
        let test: Schema<{
            a: {
                b: {
                    c: 'int',
                    d: ['int'],
                    e: [IntegerValidator]
                },
                f: {
                    [nullable]: true,
                    a: 'int?'
                },
                'g?': 'int?[]',
                'h?': 'string',
                'i?': {
                    j: BooleanValidator,
                    k: {
                        l: 'float?'
                    }
                }
            }
        }>
        expect(types['tempTestNewSchema']).toEqual(
            `{
                a: {
                    b: {
                        c: number;
                        d: number[];
                        e: number[];
                    };
                    f: {
                        a: number | null;
                    } | null;
                    g?: (number | null)[];
                    h?: string;
                    i?: {
                        j: boolean;
                        k: {
                            l: number | null;
                        };
                    };
                };
            }`.replaceAll(/\s+/g, ' ')
        )
    })

    it('validates and types non-shorthand array syntax correctly', () => {
        /** @export arraySyntax */
        const typedObject = validate({
            a: [ 'int' ]
        }, {
            a: [ 1 ]
        } as unknown)
        expect(typedObject).toEqual({ a: [ 1 ] })
        expect(types['arraySyntax']).toEqual('{ a: number[]; }')
    })

    it('validates and types arrays of objects correctly', () => {
        /** @export arraysOfObjects */
        const typedObject = validate({
            a: [{
                b: 'int',
                c: 'string'
            }]
        }, {
            a: [{
                b: 1,
                c: 'abc'
            }, {
                b: 2,
                c: 'def'
            }]
        } as unknown)
        expect(typedObject).toEqual({
            a: [{
                b: 1,
                c: 'abc'
            }, {
                b: 2,
                c: 'def'
            }]
        })
        expect(types['arraysOfObjects']).toEqual('{ a: { b: number; c: string; }[]; }')
    })
})
