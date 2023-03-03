import { readdirSync, readFileSync } from 'fs'
import path from 'path'

/**
 * Get all submition data from the data folder.
 *
 * @returns An array of submition data.
 */
export const getAllSubmitions = (): { [key: string]: string }[] => {
  const files = readdirSync(path.join(process.cwd(), 'data'))
  const submitions = files.map((file) => {
    const data = readFileSync(path.join(process.cwd(), 'data', file))
    return JSON.parse(data.toString())
  })
  return submitions
}
