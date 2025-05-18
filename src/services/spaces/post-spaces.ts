import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb'
import { marshall } from '@aws-sdk/util-dynamodb'
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context
} from 'aws-lambda'
import { v4 } from 'uuid'
import { validateSpace } from '../shared/validator'

export async function postSpaces(
  event: APIGatewayProxyEvent,
  ddbClient: DynamoDBClient
): Promise<APIGatewayProxyResult> {
  const randomId = v4()
  const item = JSON.parse(event.body)
  item.id = randomId

  validateSpace(item)

  const result = await ddbClient.send(
    new PutItemCommand({
      TableName: process.env.TABLE_NAME,
      Item: marshall(item)
    })
  )

  return {
    statusCode: 201,
    body: JSON.stringify({ id: item.id })
  }
}
