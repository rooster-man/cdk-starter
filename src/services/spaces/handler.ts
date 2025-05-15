import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context
} from 'aws-lambda'

async function handler(
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> {
  switch (event.httpMethod) {
    case 'GET':
      return {
        statusCode: 200,
        body: 'hello from get'
      }
    case 'POST':
      return {
        statusCode: 201,
        body: 'hello from post'
      }
    default:
      return {
        statusCode: 405,
        body: 'Method not allowed'
      }
  }
}

export { handler }
