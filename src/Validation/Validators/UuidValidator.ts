import type { TypeValidator } from "../SchemaValidation"
import { StringValidator } from "./StringValidator"

type Uuid = `${string}-${string}-${string}-${string}-${string}`

export class UuidValidator implements TypeValidator<Uuid> {
    validate(value: unknown): [value: null, error: string] | [value: Uuid, error: null] {
        const [strValue, error] = new StringValidator(false, false).validate(value)

        if(error !== null) {
            return [null, error]
        }

        if(!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(strValue)) {
            return [null, 'value was not a valid uuid']
        }

        return [strValue as Uuid, null]
    }
}