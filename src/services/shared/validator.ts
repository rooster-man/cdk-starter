import { Space } from '../model/model'

export class MissingFieldError extends Error {
  constructor(field: string) {
    super(`Missing field: ${field}`)
  }
}

export class JsonError extends Error {
  constructor(message: string) {
    super(message)
  }
}

export const validateSpace = (arg: any) => {
  if ((arg as Space).id === undefined) {
    throw new MissingFieldError('id')
  }
  if ((arg as Space).location === undefined) {
    throw new MissingFieldError('location')
  }
  if ((arg as Space).name === undefined) {
    throw new MissingFieldError('name')
  }
}
