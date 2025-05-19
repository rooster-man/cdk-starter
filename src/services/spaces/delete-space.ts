import {
  DeleteItemCommand,
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
  ScanCommand,
  UpdateItemCommand
} from '@aws-sdk/client-dynamodb'
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb'
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context
} from 'aws-lambda'
import { isAdmin } from '../shared/utils'

export async function deleteSpace(
  event: APIGatewayProxyEvent,
  ddbClient: DynamoDBClient
): Promise<APIGatewayProxyResult> {
  if (!isAdmin(event)) {
    return {
      statusCode: 403,
      body: JSON.stringify({ message: 'Forbidden' })
    }
  }

  if (event.queryStringParameters && 'id' in event.queryStringParameters) {
    const id = event.queryStringParameters.id

    await ddbClient.send(
      new DeleteItemCommand({
        TableName: process.env.TABLE_NAME,
        Key: marshall({ id })
      })
    )

    return {
      statusCode: 200,
      body: JSON.stringify(`Deleted space with id ${id}`)
    }
  } else {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: 'Missing id' })
    }
  }
}
