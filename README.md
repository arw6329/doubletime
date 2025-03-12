# Doubletime - validate object schemas at runtime with compile-time type inference

Simple and straightforward library to validate TypeScript objects against a schema at runtime with compile-time type safety (a.k.a. doubletime!).

```ts
import { object } from 'doubletime'

const untypedObject: unknown = JSON.parse(`{
    "profileId": "5ca28d8c-a909-4900-9ffb-afb14a28dbd3",
    "name": "Eva Williams",
    "age": 23,
    "bio": null,
    "comments": [{
        "text": "Easily parse objects with compile-time type safety!"
    }, {
        "text": "Perfect for parsing API request bodies",
        "edits": [{
            "text": "Or providing IntelliSense hints for db data while enforcing expected schemas at runtime"
        }]
    }]
}`)

// Type will be inferred from schema, so you get
// IntelliSense code completion and compile-time safety 
const typedObject = object({
    profileId: 'uuid',
    name: 'string',
    age: 'int',
    bio: 'string?',
    comments: [{
        text: 'string',
        'edits?': [{
            text: 'string'
        }]
    }]
}).validate(untypedObject)

// typeof typedObject is {
//     profileId: `${string}-${string}-${string}-${string}-${string}`;
//     name: string;
//     age: number;
//     bio: string | null;
//     comments: {
//         text: string;
//         edits?: {
//             text: string;
//         }[];
//     }[];
// }

// TypeScript does not complain here
typedObject.name
typedObject.comments[1].edits?.[0].text
```

## Table of Contents

- [Install](#install)
- [Basic usage](#basic-usage)
- [Object schema syntax](#schema-syntax)
    - [Strings](#strings)
        - [Basic strings](#basic-strings)
        - [Enforcing strings are non-empty](#enforcing-strings-are-non-empty)
        - [Trimming strings](#trimming-strings)
        - [Uuid strings](#uuids)
    - [Integers](#integers)
    - [Floating point numbers](#floating-point-numbers)
    - [Booleans](#booleans)
    - [Arrays](#arrays)
    - [Nullability](#nullability)
    - [Optionality](#optionality)
- [Numeric validator options](#numeric-validator-options)
- [String validator options](#string-validator-options)
- [Throwing vs returning validation errors](#throwing-vs-returning-validation-errors)
- [Custom validators](#custom-validators)
- [TODO/Planned features](#todoplanned-features)
- [License](#license)

## Install

```
npm install doubletime
```

## Basic usage

This project provides a number of *validators* for assorted data types. Validators are objects that contain a `validate()` function that accepts arbitrary data and returns the data in a strongly-typed form, sometimes modified, if the data is considered valid. For example, an integer validator can be obtained with `int()`, which returns the value passed to `validate()` if it is a javascript `number` primitive and a whole number:

```ts
import { int } from 'doubletime'

// typeof typedInt is number
const typedInt = int().validate(parseInt('123') as unknown)
```

Validators throw a `SchemaValidationError` if the data passed to them is invalid:

```ts
// throws 'bad type; expected "number", got "string"'
const typedInt = int().validate('wow!')
```

The most important validator is `object()`, which accepts an object whose values are validators and can be used to verify the schema of an entire object:

```ts
import { object, string, int } from 'doubletime'

const validator = object({
    name: string(),
    age: int(),
    address: {
        street: string(),
        city: string(),
        zip: int()
    }
})

// typeof typedObject is {
//     name: string;
//     age: number;
//     address: {
//         street: string;
//         city: string;
//         zip: number;
//     };
// }
const typedObject = validator.validate(
    JSON.parse(`{
        "name": "Jane Doe",
        "age": 21,
        "address": {
            "street": "1234 Alexander Ave",
            "city": "Gotham City",
            "zip": 12345
        }
    }`)
)
```

While you can explicitly specify the validator for each property, doubletime also allows you to use shorthand type specifications in the form of strings in most circumstances. The above example can also be written like so:

```ts
const validator = object({
    name: 'string',
    age: 'int',
    address: {
        street: 'string',
        city: 'string',
        zip: 'int'
    }
})

const typedObject = validator.validate(
    JSON.parse(`{
        "name": "Jane Doe",
        "age": 21,
        "address": {
            "street": "1234 Alexander Ave",
            "city": "Gotham City",
            "zip": 12345
        }
    }`)
)
```

The specification for an object's structure passed to the `object()` call is called a *concrete schema*. It is concrete in that it exists at runtime rather than being erased like typescript's type system.

The typescript type of a valid object corresponding to a particular concrete schema can be obtained using `Schema<typeof concreteSchema>`. For example:

```ts
import { object, type Schema } from 'doubletime'

const personSchema = {
    name: 'string',
    age: 'int',
    address: {
        street: 'string',
        city: 'string',
        zip: 'int'
    }
} as const

// equivalent to {
//     name: string;
//     age: number;
//     address: {
//         street: string;
//         city: string;
//         zip: number;
//     };
// }
type Person = Schema<typeof personSchema>

function printPersonDetails(person: Person) {
    console.log(`${person.name} lives in ${person.address.city}`)
}

const person = object(personSchema).validate(
    JSON.parse(`{
        "name": "Jane Doe",
        "age": 21,
        "address": {
            "street": "1234 Alexander Ave",
            "city": "Gotham City",
            "zip": 12345
        }
    }`)
)

printPersonDetails(person)
```

## Schema syntax

### Strings

#### Basic strings

Use `'string'` or `string()` to enforce an object key is a string:

```ts
import { object, string } from 'doubletime'

// typeof typedObject is {
//     abc: string;
//     def: string;
// }
const typedObject = object({
    abc: 'string',
    def: string()
}).validate({
    abc: 'Hello',
    def: 'world'
})
```

#### Enforcing strings are non-empty

You can use the value `'non-empty string'` to enforce a string-valued object key is non-empty:

```ts
import { object } from 'doubletime'

const validator = object({
    abc: 'non-empty string'
})

// typeof typedObject1 is {
//     abc: string;
// }
const typedObject1 = validator.validate({
    abc: 'Some string here'
})

// typeof typedObject2 is {
//     abc: string;
// }
//
// but will throw 'value "" is not valid; minimum accepted length is 1' at runtime
const typedObject2 = validator.validate({
    abc: ''
})
```

#### Trimming strings

You can use `'trimmed string'` or `'trimmed non-empty string'` to automatically trim whitespace from both ends of a string:

```ts
import { object, string } from 'doubletime'

// typedObject1 is {
//     abc: 'Hello',
//     def: 'world'
// }
const typedObject1 = object({
    abc: 'trimmed string',
    def: 'trimmed string'
}).validate({
    abc: '   Hello   ',
    def: 'world'
})

// throws 'value "" is not valid; minimum accepted length is 1'
// because "def" is empty (after trimming)
const typedObject2 = object({
    abc: 'trimmed non-empty string',
    def: 'trimmed non-empty string'
}).validate({
    abc: '   Hello   ',
    def: '       '
})
```

#### Uuids

Use `'uuid'` or `uuid()` to enforce a string is a valid uuid:

```ts
import { object, uuid } from 'doubletime'

// typeof typedObject is {
//     abc: `${string}-${string}-${string}-${string}-${string}`;
//     def: `${string}-${string}-${string}-${string}-${string}`;
// }
const typedObject = object({
    abc: 'uuid',
    def: uuid()
}).validate({
    abc: '5ca28d8c-a909-4900-9ffb-afb14a28dbd3',
    def: '114462d1-897d-460b-8f57-07d2f7970bc0'
})
```

The type of a uuid key is assignable to `string` but a little more specific using template literal types to capture the format of uuids.

### Integers

Use `'int'`, `'integer'` or `int()` to enforce an object key is an integer:

```ts
import { object, int } from 'doubletime'

// typeof typedObject is {
//     abc: number;
//     def: number;
//     ghi: number;
// }
const typedObject = object({
    abc: 'int',
    def: 'integer',
    ghi: int()
}).validate({
    abc: 123,
    def: 456.0,
    ghi: -789
})
```

Strings containing integers are not accepted:

```ts
// throws 'bad type; expected "number", got "string"'
const typedObject = object({
    abc: 'int'
}).validate({
    abc: '123'
})
```

### Floating point numbers

Use `'float'` or `float()` to enforce an object key is a floating point number:

```ts
import { object, float } from 'doubletime'

// typeof typedObject is {
//     abc: number;
//     def: number;
//     ghi: number;
// }
const typedObject = object({
    abc: 'float',
    def: 'float',
    ghi: float()
}).validate({
    abc: 123,
    def: 0.5,
    ghi: -100.75
})
```

Strings containing numbers are not accepted:

```ts
// throws 'bad type; expected "number", got "string"'
const typedObject = object({
    abc: 'float'
}).validate({
    abc: '123.456'
})
```

### Booleans

Use `'boolean'` or `bool()` to enforce an object key is a boolean:

```ts
import { object, bool } from 'doubletime'

// typeof typedObject is {
//     abc: boolean;
//     def: boolean;
// }
const typedObject = object({
    abc: 'boolean',
    def: bool(),
}).validate({
    abc: true,
    def: false
})
```

### Arrays

Any of the string-based schema values can be made into arrays by appending `[]` after the type:

```ts
import { object } from 'doubletime'

// typeof typedObject is {
//     abc: number[];
//     def: string[];
//     ghi: boolean[];
// }
const typedObject = object({
    abc: 'int[]',
    def: 'non-empty string[]',
    ghi: 'boolean[]'
}).validate({
    abc: [1, 2],
    def: ['abc', 'def'],
    ghi: [true, false]
})
```

Alternatively, you can wrap any validator or shorthand type string in an actual array (this only works one level deep):

```js
import { object, bool } from 'doubletime'

// typeof typedObject is {
//     abc: number[];
//     def: string[];
//     ghi: boolean[];
// }
const typedObject = object({
    abc: [ 'int' ],
    def: [ 'non-empty string' ],
    ghi: [ bool() ]
}).validate({
    abc: [1, 2],
    def: ['abc', 'def'],
    ghi: [true, false]
})
```

Alternatively, you can use the `array()` function and pass it a validator that will be used for the component elements:

```js
import { object, array, int } from 'doubletime'

// typeof typedObject is {
//     abc: number[];
// }
const typedObject = object({
    abc: array(int())
}).validate({
    abc: [1, 2]
})
```

`array()` validators can be nested to arbitrary depth:

```js
import { object, array, int } from 'doubletime'

// typeof typedObject is {
//     abc: number[][][];
// }
const typedObject = object({
    abc: array(array(array(int())))
}).validate({
    abc: [[[1, 2], [3, 4]], [[5, 6]]]
})
```

### Nullability

Any of the string-based schema values can be marked nullable by adding a question mark after them:

```ts
import { object } from 'doubletime'

// typeof typedObject is {
//     abc: number | null;
//     def: string | null;
//     ghi: boolean | null;
// }
const typedObject = object({
    abc: 'int?',
    def: 'non-empty string?',
    ghi: 'boolean?'
}).validate({
    abc: null,
    def: 'abc',
    ghi: false
})
```

Arrays can have only their elements marked as nullable by including the question mark before the square brackets, or the entire array-valued key itself can be marked nullable by including the question mark after the brackets:

```ts
import { object } from 'doubletime'

// typeof typedObject is {
//     abc: (number | null)[];
//     def: number[] | null;
//     ghi: (number | null)[] | null;
// }
const typedObject = object({
    abc: 'int?[]',
    def: 'int[]?',
    ghi: 'int?[]?'
}).validate({
    abc: [1, null, 3],
    def: null,
    ghi: null
})
```

Object-valued keys can be marked nullable by importing the `nullable` symbol and setting it to true on the nullable object: 

```ts
import { object, nullable } from 'doubletime'

const validator = object({
    someObject: {
        [nullable]: true,
        a: 'int',
        b: 'string'
    }
})

// typeof typedObject1 is {
//     someObject: {
//         a: number;
//         b: string; 
//     } | null;
// }
const typedObject1 = validator.validate({
    someObject: {
        a: 123,
        b: 'def'
    }
})

// typeof typedObject1 is {
//     someObject: {
//         a: number;
//         b: string; 
//     } | null;
// }
const typedObject2 = validator.validate({
    someObject: null
})
```

Alternatively, wrap any validator in a call to `maybe()` to make it nullable:

```ts
import { object, maybe, int } from 'doubletime'

// typeof typedObject is {
//     abc: number | null;
// }
const typedObject = object({
    abc: maybe(int())
}).validate({
    abc: null
})
```

### Optionality

Keys whose names end in a question mark are optional. The question mark is not expected to be present in the key name at runtime:

```ts
import { object } from 'doubletime'

const validator = object({
    'optionalString?': 'string',
    'optionalInt?': 'int'
})

// typeof typedObject1 is {
//     optionalString?: string;
//     optionalInt?: number;
// }
const typedObject1 = validator.validate({
    optionalString: 'String was provided'
})

// typeof typedObject2 is {
//     optionalString?: string;
//     optionalInt?: number;
// }
const typedObject2 = validator.validate({
    optionalInt: 123
})
```

## Numeric validator options

Integer and float validators support the following options:

- `parseStrings`: `boolean`: whether to accept and parse numeric strings (using the global `parseInt` or `parseFloat` function)
- `min`: `number`: minimum accepted value (inclusive)
- `max`: `number`: maximum accepted value (inclusive)
- `ensure`: `(number) => boolean`: custom callback function where you can do arbitrary validation logic 

Integers also accept the following additional option:

- `parity`: `'even' | 'odd'`: parity of the integer

```ts
import { int } from 'doubletime'

const validator = int({
    parseStrings: true,
    min: -6,
    max: 10,
    parity: 'even',
    ensure: (number) => number + 1 === 2 + number - 1
})

// no errors
const a = validator.validate(0)
const b = validator.validate(-6)
const c = validator.validate(10)
const d = validator.validate('4')

// throws 'value "15" is not valid; maximum accepted value is 10'
const e = validator.validate(15)
```

## String validator options

String validators support the following options:

- `minLength`: `number`: minimum length of the string
- `maxLength`: `number`: maximum length of the string
- `match`: `RegExp`: regular expression the string must match to be considered valid
- `trim`: `boolean`: whether or not to trim whitespace from each end of the string
- `ensure`: `(string) => boolean`: custom callback function where you can do arbitrary validation logic 
- `transform`: `(string) => string`: custom callback function that you can use to transform a string after all other validation has occurred

```ts
import { string } from 'doubletime'

const usernameValidator = string({
    minLength: 4,
    maxLength: 16,
    trim: true,
    match: /^[a-z][a-z0-9]*(?:[-_][a-z0-9]+)*$/i,
    ensure: (string) => string !== 'admin' && string !== 'system',
    transform: (string) => string.toLowerCase()
})

// no errors
const a = usernameValidator.validate('Someone123') // returns "someone123"
const b = usernameValidator.validate('  Eva-Girl2001 ') // returns "eva-girl2001"

// throws 'value "AVeryLongUsernameHere" is not valid; maximum accepted length is 16'
const c = validator.validate('AVeryLongUsernameHere')
// throws 'value "B@d~characters!" is not valid; input must match regular expression /^[a-z][a-z0-9]*(?:[-_][a-z0-9]+)*$/i'
const d = validator.validate('B@d~characters!')
```

Note that `transform` occurs after other checks like `minLength/maxLength/ensure` and can return a value that does not comply with these constraints.

## Throwing vs returning validation errors 

Calling `validate()` on any validator will cause a `SchemaValidationError` to be raised if the passed data is not valid:

```ts
import { int } from 'doubletime'

// throws 'bad type; expected "number", got "string"'
const typedInt = int().validate('whoops')
```

Instead of throwing errors, doubletime can return them by calling `safeValidate`:

```ts
import { int } from 'doubletime'

const { value, error } = int().safeValidate('whoops')

if(error) {
    // Validation failed, handle error.
    // "value" const is undefined.
} else {
    // Validation succeeded.
    // "value" const is set.
}
```

When using `safeValidate`, the `error` property of the returned object will be an instance of `Error` if an error occurred, otherwise `error` will be `undefined`.

## Custom validators

You can create custom validators for arbitrary datatypes by extending `TypeValidator<>` and implementing `validate()`. It is recommended to throw the errors provided by doubletime when validation fails.

```ts
import { TypeValidator, BadTypeError, BadFormatError, object, int } from '#/entrypoint'

type DayOfWeek =
    'Monday' |
    'Tuesday' |
    'Wednesday' |
    'Thursday' |
    'Friday' |
    'Saturday' |
    'Sunday'
        
class DayOfWeekValidator extends TypeValidator<DayOfWeek> {
    validate(value: unknown): DayOfWeek {
        if(typeof value !== 'string') {
            throw new BadTypeError('string', typeof value)
        }

        if(![
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday'
        ].includes(value)) {
            throw new BadFormatError(value, 'day of week')
        }

        return value as DayOfWeek
    }
}

const day = new DayOfWeekValidator().validate('Wednesday')
        
const dayAndDate = object({
    day: new DayOfWeekValidator(),
    date: int({
        min: 1,
        max: 31
    })
}).validate({
    day: 'Friday',
    date: 13
})
```

## TODO/Planned features

- Custom type validators
- safeValidate() alternative that returns { typedObject } | { error } instead of throwing errors on validation failure
- Email validator
- Ability to specify min/max for numeric validators, min/max length for string validators, etc.
- Union and intersection validators
- String enum validators
- Support parsing strings for int()/float()/object()
- Boolean-like validators (accepting integers 0/1, etc.)
- Date validators (yyyy-mm-dd UTC date and yyyy-mm-dd hh:mm:ss UTC timestamp formats)

Feel free to open a GitHub issue to suggest more features.

## License

doubletime is licensed under the MIT license.
