import { SchemaValidationError } from "./errors"
import { Schema, ConcreteSchema } from "./Validation/SchemaValidation"
import { ObjectValidator } from "./Validation/Validators/ObjectValidator"

export function validate<CS extends ConcreteSchema>(concreteSchema: CS, object: unknown): Schema<CS> {
    try {
        const typedObject = new ObjectValidator(concreteSchema).validate(object)
        return typedObject
    } catch(e) {
        if(e instanceof Error) {
            throw new SchemaValidationError(`Error during schema validation: ${e.message}`)
        } else {
            throw e
        }
    }
}

export { nullable } from "./Validation/Validators/ObjectValidator"
