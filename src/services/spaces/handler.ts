import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context
} from 'aws-lambda'
import { postSpaces } from './post-spaces'
import { getSpaces } from './get-spaces'
import { putSpace } from './put-space'
import { deleteSpace } from './delete-space'
import { JsonError, MissingFieldError } from '../shared/validator'

const ddbClient = new DynamoDBClient({})

async function handler(
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> {
  try {
    switch (event.httpMethod) {
      case 'GET':
        return await getSpaces(event, ddbClient)
      case 'POST':
        return await postSpaces(event, ddbClient)
      case 'PUT':
        return await putSpace(event, ddbClient)
      case 'DELETE':
        return await deleteSpace(event, ddbClient)
      default:
        return {
          statusCode: 405,
          body: 'Method not allowed'
        }
    }
  } catch (error) {
    if (error instanceof MissingFieldError) {
      return {
        statusCode: 400,
        body: error.message
      }
    }
    if (error instanceof JsonError) {
      return {
        statusCode: 400,
        body: error.message
      }
    }
    return {
      statusCode: 500,
      body: error.message
    }
  }
}

export { handler }
