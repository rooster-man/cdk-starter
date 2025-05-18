import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb'
import { marshall } from '@aws-sdk/util-dynamodb'
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context
} from 'aws-lambda'
import { validateSpace } from '../shared/validator'
import { createRandomId, parseJSON } from '../shared/utils'

export async function postSpaces(
  event: APIGatewayProxyEvent,
  ddbClient: DynamoDBClient
): Promise<APIGatewayProxyResult> {
  const randomId = createRandomId()
  const item = parseJSON(event.body)
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
