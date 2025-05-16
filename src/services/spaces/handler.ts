import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context
} from 'aws-lambda'
import { postSpaces } from './post-spaces'

const ddbClient = new DynamoDBClient({})

async function handler(
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> {
  try {
    switch (event.httpMethod) {
      case 'GET':
        return {
          statusCode: 200,
          body: 'hello from get'
        }
      case 'POST':
        return postSpaces(event, ddbClient)
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
