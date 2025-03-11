import { describe, expect, it } from "@jest/globals"
import { string } from '#/entrypoint'

describe('README', () => {
    it('parses strings with options correctly', () => {
        const usernameValidator = string({
            minLength: 4,
            maxLength: 16,
            trim: true,
            match: /^[a-z][a-z0-9]*(?:[-_][a-z0-9]+)*$/i,
            ensure: (string) => string !== 'admin' && string !== 'system',
            transform: (string) => string.toLowerCase()
        })

        expect(usernameValidator.validate('Someone123')).toBe('someone123')
        expect(usernameValidator.validate('  Eva-Girl2001 ')).toBe('eva-girl2001')

        expect(() => usernameValidator.validate('AVeryLongUsernameHere')).toThrow('value "AVeryLongUsernameHere" is not valid; maximum accepted length is 16')
        expect(() => usernameValidator.validate('B@d~characters!')).toThrow('value "B@d~characters!" is not valid; input must match regular expression /^[a-z][a-z0-9]*(?:[-_][a-z0-9]+)*$/i')
    })
})