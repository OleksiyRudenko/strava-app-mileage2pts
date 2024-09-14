import {date2UTCString, dateWithTimeZone} from "./date-helpers.js"

// For Jest to run ESM, in JetBrains IDE: Run > Edit configurations > Node options = --experimental-vm-modules

// ensure test works in any timezone the running machine's time set in
// https://stackoverflow.com/questions/15141762/how-to-initialize-a-javascript-date-to-a-particular-time-zone

const expectedUTCString = "2024-09-13T13:20:34.000Z"

const date2UTCStringTestCases = [
  [new Date("September 13, 2024 3:20:34 pm"), expectedUTCString,],
  [new Date(2024, 8, 13, 15, 20, 34), expectedUTCString],
  ["2024-09-13T15:20:34+02:00", expectedUTCString],
  ["2024-09-13T13:20:34Z", expectedUTCString],
]

const localMachineTime = new Date()
const localMachineTimePreviousDay = new Date()
localMachineTimePreviousDay.setDate(localMachineTime.getDate() - 1)
const localMachineDatePreviousDayString = `${localMachineTimePreviousDay.getFullYear()}-${(localMachineTimePreviousDay.getMonth() + 1).toString().padStart(2, '0')}-${localMachineTimePreviousDay.getDate().toString().padStart(2, '0')}`

const dateWithTimeZoneTestCases = [
  [["Europe/Warsaw", 2024, 9, 14, 9, 52, 0],
    "2024-09-14T07:52:00.000Z"],
  [["Europe/Warsaw"],
    `${localMachineDatePreviousDayString}T22:00:00.000Z`],
  [["Europe/London"],
    `${localMachineDatePreviousDayString}T23:00:00.000Z`],
  [[],
    `${localMachineDatePreviousDayString}T23:00:00.000Z`],
]

describe('date2UTCString: Positive scenarios', () => {
  test.each(date2UTCStringTestCases)(
    'converts %p into ISO UTC string %p',
    (input, expectedUTCString) => {
      expect(date2UTCString(input)).toEqual(expectedUTCString)
    }
  )
})

describe('dateWithTimeZone: Positive scenarios', () => {
  test.each(dateWithTimeZoneTestCases)(
    'creates date from %p. UTC is expected to be %p',
    (input, expectedUTCString) => {
      expect(dateWithTimeZone(...input).toISOString()).toEqual(expectedUTCString)
    }
  )
})
