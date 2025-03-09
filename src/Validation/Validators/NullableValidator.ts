import type { TypeValidator } from "../SchemaValidation"

export class NullableValidator<T> implements TypeValidator<T|null> {
    constructor(
        private validator: TypeValidator<T>
    ) {}

    validate(value: unknown): T | null {
        if(value === null) {
            return null
        }

        return this.validator.validate(value)
    }
}