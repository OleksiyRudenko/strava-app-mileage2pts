/**
 * Converts input date (string or Obejct) into date string in UTC TZ
 * @param date
 * @returns {string}
 */
export const date2UTCString = date => {
  if (typeof(date) === "string") date = new Date(date)
  return date.toISOString()
}
