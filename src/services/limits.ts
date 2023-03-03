import { getAllSubmitions } from '../libs/getAllSubmitions.js'
import type { Limit } from '../types/Configuration.d'
import { configuration } from './configuration.js'

/**
 * Check if a submition is within the limits of the service.
 *
 * @param data Submitted data.
 * @returns True if the submition is within the limits
 * or a string with the error message.
 */
export const checkLimits = (data: { [key: string]: string }): true | string => {
  const limits = configuration.limits || []
  for (const limit of limits) {
    const result = checkLimit(limit, data)
    if (result !== true) {
      return result
    }
  }
  return true
}

/**
 * Check if a submition is within a limit.
 *
 * @param limit The limit to check.
 * @param data Submitted data.
 * @returns True if the submition is within the limit
 * or a string with the error message.
 */
export const checkLimit = (limit: Limit, data: { [key: string]: string }) => {
  switch (limit.type) {
    case 'exists':
      return checkExistsLimit(limit, data)
    case 'max':
      return checkMaxLimit(limit, data)
    default:
      return true
  }
}

/**
 * Check if a submition is within an exists limit.
 *
 * @param limit The limit to check.
 * @param data Submitted data.
 * @returns True if the submition is within the limit
 * or a string with the error message.
 */
export const checkExistsLimit = (limit: Limit, data: { [key: string]: string }) => {
  if (limit.type !== 'exists') return 'Invalid limit type.'

  const previousSubmitions = getAllSubmitions()
  const matchingSubmitions = previousSubmitions.filter((s) => s[limit.field] === data[limit.field])
  return matchingSubmitions.length === 0 ? true : limit.message
}

/**
 * Check if a submition is within a max limit.
 *
 * @param limit The limit to check.
 * @param data Submitted data.
 * @returns True if the submition is within the limit
 * or a string with the error message.
 */
export const checkMaxLimit = (limit: Limit, data: { [key: string]: string }) => {
  if (limit.type !== 'max') return 'Invalid limit type.'

  const previousSubmitions = getAllSubmitions()
  const sum = previousSubmitions.reduce((acc, s) => acc + Number(s[limit.field]), 0)
  return sum + Number(data[limit.field]) <= limit.value ? true : limit.message
}
