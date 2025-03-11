export class SchemaValidationError extends Error {}

export class BadSchemaError extends SchemaValidationError {}

export class BadTypeError extends SchemaValidationError {
    constructor(
        expectedType: string,
        foundType: string
    ) {
        super(`bad type; expected "${expectedType}", got "${foundType}"`)
    }
}

export class BadFormatError extends SchemaValidationError {
    constructor(
        value: string,
        expectedFormat: string
    ) {
        super(`value "${value}" not a valid ${expectedFormat}`)
    }
}

export class BadValueError extends SchemaValidationError {
    constructor(
        value: string,
        details: string
    ) {
        super(`value "${value}" is not valid; ${details}`)
    }
}