import type { TypeValidator } from "../SchemaValidation"

export class NoopValidator implements TypeValidator<unknown> {
    validate(value: unknown): unknown {
        return value
    }
}
