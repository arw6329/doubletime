import { TypeValidator } from "../TypeValidator"

export class NullableValidator<T> extends TypeValidator<T|null> {
    constructor(
        private validator: TypeValidator<T>
    ) { super() }

    validate(value: unknown): T | null {
        if(value === null) {
            return null
        }

        return this.validator.validate(value)
    }
}