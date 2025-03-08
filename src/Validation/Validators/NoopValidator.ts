import type { TypeValidator } from "../SchemaValidation"

export class NoopValidator implements TypeValidator<unknown> {
    validate(value: unknown): [value: unknown, error: null] {
        return [value, null]
    }
}
