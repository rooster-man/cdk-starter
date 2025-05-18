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

const ddbClient = new DynamoDBClient({})

async function handler(
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> {
  try {
    switch (event.httpMethod) {
      case 'GET':
        return getSpaces(event, ddbClient)
      case 'POST':
        return postSpaces(event, ddbClient)
      case 'PUT':
        return putSpace(event, ddbClient)
      case 'DELETE':
        return deleteSpace(event, ddbClient)
      default:
        return {
          statusCode: 405,
          body: 'Method not allowed'
        }
    }
  } catch (error) {
    console.error(error)
    return {
      statusCode: 500,
      body: JSON.stringify(error.message)
    }
  }
}

export { handler }
