import { TypeValidator } from "../TypeValidator"

export class NoopValidator extends TypeValidator<unknown> {
    validate(value: unknown): unknown {
        return value
    }
}
