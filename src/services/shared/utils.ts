import { JsonError } from './validator'
import { randomUUID } from 'crypto'

export const parseJSON = (arg: string) => {
  try {
    return JSON.parse(arg)
  } catch (e) {
    throw new JsonError(e.message)
  }
}

export const createRandomId = () => {
  return randomUUID()
}
