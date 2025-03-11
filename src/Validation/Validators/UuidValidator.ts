import { BadFormatError } from "#/errors"
import type { TypeValidator } from "../SchemaValidation"
import { StringValidator } from "./StringValidator"

type Uuid = `${string}-${string}-${string}-${string}-${string}`

export class UuidValidator implements TypeValidator<Uuid> {
    validate(value: unknown): Uuid {
        const strValue = new StringValidator({ minLength: 1 }).validate(value)

        if(!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(strValue)) {
            throw new BadFormatError(strValue, 'uuid')
        }

        return strValue as Uuid
    }
}