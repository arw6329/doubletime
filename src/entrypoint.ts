import { Schema, ConcreteSchema } from "./Validation/SchemaValidation"
import { ObjectValidator } from "./Validation/Validators/ObjectValidator"

export function validate<CS extends ConcreteSchema>(concreteSchema: CS, object: unknown): Schema<CS> {
    const [typedObject, error] = new ObjectValidator(concreteSchema).validate(object)

    if(error !== null) {
        throw new Error(`Error during schema validation: ${error}`)
    }

    return typedObject
}

export { nullable } from "./Validation/Validators/ObjectValidator"
