export class SchemaValidationError extends Error {}

export class BadSchemaError extends SchemaValidationError {}

export class BadTypeError extends SchemaValidationError {
    constructor(
        expectedType: string,
        foundType: string
    ) {
        super(`Bad type; expected "${expectedType}", got "${foundType}"`)
    }
}
