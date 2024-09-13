import {date2UTCString} from "./date-helpers.js"

const inputs = [
  new Date("September 13, 2024 3:20:34 pm"),
  new Date(2024, 8, 13, 15, 20, 34),
  "2024-09-13T15:20:34+02:00",
]

const expectedUTCString = "2024-09-13T13:20:34.000Z"

test('date to ISO UTC string', () => {
  inputs.forEach(input => expect(date2UTCString(input)).toBe(expectedUTCString))
})
