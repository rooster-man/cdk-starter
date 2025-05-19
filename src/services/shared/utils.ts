import { APIGatewayProxyEvent } from 'aws-lambda'
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

export const isAdmin = (event: APIGatewayProxyEvent): boolean => {
  const groups = event.requestContext.authorizer?.claims['cognito:groups']
  return groups?.includes('admin') ?? false
}
