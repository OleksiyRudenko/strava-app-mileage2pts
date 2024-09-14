/**
 * Converts input date (string or Obejct) into date string in UTC TZ
 * @param date
 * @returns {string}
 */
export const date2UTCString = date => {
  if (typeof (date) === "string") date = new Date(date)
  return date.toISOString()
}

/**
 * Creates date in given TimeZone.
 * If any of year, month, day is omitted then machine time is used for values.
 * If any of hour, minute, second is omitted then zero is applied.
 * @example dateWithTimeZone("Europe/Warsaw", 2024, 8, 1) - time in Warsaw, beginning of August 1, 2024
 * @example dateWithTimeZone("Europe/Warsaw") - time in Warsaw at the today's day beginning where machine is located
 * @example dateWithTimeZone() - time in London at the machine's day beginning, i.e. 23:00 of previous day if machine is in CET (Berlin, Warsaw...)
 * Inspired by https://stackoverflow.com/questions/15141762/how-to-initialize-a-javascript-date-to-a-particular-time-zone
 * @param timeZone - one of Intl.supportedValuesOf("timeZone")
 * @param year
 * @param month - 1..12, not monthIndex
 * @param day
 * @param hour
 * @param minute
 * @param second
 * @returns {Date}
 */
export const dateWithTimeZone = (timeZone = "Europe/London", year, month, day, hour, minute, second) => {
  const machineDate = new Date()
  const monthIndex = typeof (month) === 'undefined' ? machineDate.getMonth() : --month
  let date = new Date(
    Date.UTC(year ?? machineDate.getFullYear(), monthIndex, day ?? machineDate.getDate(),
      hour ?? 0, minute ?? 0, second ?? 0)
  )

  const utcDate = new Date(date.toLocaleString('en-US', {timeZone: "UTC"}))
  const tzDate = new Date(date.toLocaleString('en-US', {timeZone: timeZone}))
  const offset = utcDate.getTime() - tzDate.getTime()

  date.setTime(date.getTime() + offset)

  return date
};
