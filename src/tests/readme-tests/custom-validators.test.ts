import { describe, expect, it } from "@jest/globals"
import { getTypes } from "../get-typescript-type"
import { compressWhitespace } from "../compress-whitespace"
import { TypeValidator, BadTypeError, BadFormatError, object, int } from '#/entrypoint'

describe('README', () => {
    it('handles custom validators correctly', () => {
        const types = getTypes(__filename)

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
        
        /** @export typedValue1 */
        const day = new DayOfWeekValidator().validate('Wednesday')
        
        /** @export typedValue2 */
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

        expect(day).toBe('Wednesday')
        expect(dayAndDate).toEqual({
            day: 'Friday',
            date: 13
        })

        expect(types.typedValue1).toEqual(compressWhitespace(`DayOfWeek`))
        expect(types.typedValue2).toEqual(compressWhitespace(`{
            day: DayOfWeek;
            date: number;
        }`))

        expect(() => new DayOfWeekValidator().validate('x')).toThrow('value "x" not a valid day of week')
    })
})