import type { TypeValidator } from "../SchemaValidation"

export class NullableValidator<T> implements TypeValidator<T|null> {
    constructor(
        private validator: TypeValidator<T>
    ) {}

    validate(value: unknown): [value: null, error: string] | [value: T|null, error: null] {
        if(value === null) {
            return [null, null]
        }

        return this.validator.validate(value)
    }
}