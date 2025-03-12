import { BadFormatError } from "#/errors"
import { TypeValidator } from "../TypeValidator"
import { StringValidator } from "./StringValidator"

type Uuid = `${string}-${string}-${string}-${string}-${string}`

export class UuidValidator extends TypeValidator<Uuid> {
    validate(value: unknown): Uuid {
        const strValue = new StringValidator({ minLength: 1 }).validate(value)

        if(!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(strValue)) {
            throw new BadFormatError(strValue, 'uuid')
        }

        return strValue as Uuid
    }
}