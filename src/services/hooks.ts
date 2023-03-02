import type { Hook } from '../types/Configuration.d'
import { configuration } from './configuration.js'

/**
 * Run all on submit hooks.
 *
 * @param data Submitted data.
 */
export const runHooks = async (data: { [key: string]: string }) => {
  const hooks = configuration.hooks.onSubmit || []
  hooks.forEach((hook) => {
    runHook(hook, data)
      .then(() => console.log(`Hook ${hook.method} ${hook.url} ran successfully.`))
      .catch((error) => console.error(`Hook ${hook.method} ${hook.url} failed with error: ${error}`))
  })
}

/**
 * Run a single hook.
 *
 * @param hook The hook to run.
 * @param data Submitted data.
 */
export const runHook = async (hook: Hook, data: { [key: string]: string }) => {
  const { method, url, headers, body } = hook

  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    body: JSON.stringify(replaceBodyPlaceholders(body, data))
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
}

/**
 * Replace body placeholders with submitted data.
 *
 * @param body The body to replace placeholders in.
 * @param data Submitted data.
 */
export const replaceBodyPlaceholders = (body: object, data: { [key: string]: string }) => {
  const keys = Object.keys(body)
  keys.forEach((key) => {
    // @ts-ignore - It's an object.
    const value = body[key]
    if (typeof value === 'string') {
      // @ts-ignore - It's an object.
      body[key] = replacePlaceholders(value, data)
    }

    if (typeof value === 'object') {
      // @ts-ignore - It's an object.
      body[key] = replaceBodyPlaceholders(value, data)
    }
  })
  return body
}

/**
 * Replace placeholders in a string with submitted data.
 *
 * @param string The string to replace placeholders in.
 * @param data Submitted data.
 */
export const replacePlaceholders = (string: string, data: { [key: string]: string }) => {
  const keys = Object.keys(data)
  keys.forEach((key) => {
    const value = data[key]
    string = string.replace(`\${${key}}`, value)
  })
  return string
}
