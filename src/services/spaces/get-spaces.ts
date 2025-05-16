import {
  DynamoDBClient,
  GetItemCommand,
  ScanCommand
} from '@aws-sdk/client-dynamodb'
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context
} from 'aws-lambda'

export async function getSpaces(
  event: APIGatewayProxyEvent,
  ddbClient: DynamoDBClient
): Promise<APIGatewayProxyResult> {
  if (event.queryStringParameters) {
    if (event.queryStringParameters.id) {
      const id = event.queryStringParameters.id

      const result = await ddbClient.send(
        new GetItemCommand({
          TableName: process.env.TABLE_NAME,
          Key: { id: { S: id } }
        })
      )

      console.log(result)

      if (result.Item) {
        return {
          statusCode: 200,
          body: JSON.stringify(result.Item)
        }
      } else {
        return {
          statusCode: 404,
          body: JSON.stringify({ message: 'Space not found' })
        }
      }
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing id' })
      }
    }
  }

  const location = event.queryStringParameters.location
  const result = await ddbClient.send(
    new ScanCommand({
      TableName: process.env.TABLE_NAME,
      FilterExpression: 'location = :location',
      ExpressionAttributeValues: {
        ':location': { S: location }
      }
    })
  )

  console.log(result.Items)

  return {
    statusCode: 200,
    body: JSON.stringify(result.Items)
  }
}
