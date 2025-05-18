import { JsonError } from './validator'

export const parseJSON = (arg: string) => {
  try {
    return JSON.parse(arg)
  } catch (e) {
    throw new JsonError(e.message)
  }
}
