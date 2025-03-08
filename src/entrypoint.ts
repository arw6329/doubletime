import { Schema, Validator } from "./Validation/SchemaValidation"
import { ObjectValidator } from "./Validation/Validators/ObjectValidator"

export function validate<V extends Validator>(validator: V, object: unknown): Schema<V> {
    const [typedObject, error] = new ObjectValidator(validator).validate(object)

    if(error !== null) {
        throw new Error(`Error during schema validation: ${error}`)
    }

    return typedObject
}

export { nullable } from "./Validation/Validators/ObjectValidator"
