export function testObject() {
    return structuredClone({
        'uuid': '351c1982-d597-42bd-ba57-0f49b8ff7c0d',
        'uuid nulled': null,
        'uuid nullable': '351c1982-d597-42bd-ba57-0f49b8ff7c0d',
        'string': 'abc def',
        'string nulled': null,
        'string nullable': 'abc def',
        'empty string': '',
        'empty string nulled': null,
        'empty string nullable': '',
        'trimmed string': '    abc    def    ',
        'trimmed string nulled': null,
        'trimmed string nullable': '    abc    def    ',
        'non-empty string': 'non-empty string',
        'non-empty string nulled': null,
        'non-empty string nullable': 'non-empty string?',
        'trimmed non-empty string': '   trimmed non-empty string   ',
        'trimmed non-empty string nulled': null,
        'trimmed non-empty string nullable': '   trimmed non-empty string   ',
        'integer': 123,
        'integer nulled': null,
        'integer nullable': -500,
        'float': 0.5,
        'float nulled': null,
        'float nullable': -100.75,
        'boolean': true,
        'boolean nulled': null,
        'boolean nullable': false,
        'object': {
            a: 60,
            b: 'string',
            c: true
        },
        'object nulled': null,
        'object nullable': {
            e: 0
        },
        'nested object parent': {
            'nested object child': {
                a: 100,
                b: 'another string',
                c: true,
                array: [1, 2, 3]
            }
        },
        'optional provided': 'I was optional',
        'optional nulled provided': null,
        'optional nullable provided': 'I was optional and nullable'
    })
}
