import { APIGatewayProxyEvent, Context } from 'aws-lambda'
import { v4 } from 'uuid'

async function handler(event: APIGatewayProxyEvent, context: Context) {
  console.log(event)

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello, world!' + v4() })
  }
}

export { handler }
