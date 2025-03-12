export abstract class TypeValidator<T> {
    abstract validate(value: unknown): T

    safeValidate(value: unknown): { value: T, error: undefined } | { value: undefined, error: Error } {
        try {
            return {
                value: this.validate(value),
                error: undefined
            }
        } catch(e) {
            if(e instanceof Error) {
                return {
                    value: undefined,
                    error: e
                }
            } else {
                throw e
            }
        }
    }
}