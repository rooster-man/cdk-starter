import {
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

export async function putSpace(
  event: APIGatewayProxyEvent,
  ddbClient: DynamoDBClient
): Promise<APIGatewayProxyResult> {
  if (
    event.queryStringParameters &&
    'id' in event.queryStringParameters &&
    event.body
  ) {
    const id = event.queryStringParameters.id
    const parsedBody = JSON.parse(event.body)
    const requestBodyKey = Object.keys(parsedBody)[0]
    const requestBodyValue = parsedBody[requestBodyKey]

    const updateResult = await ddbClient.send(
      new UpdateItemCommand({
        TableName: process.env.TABLE_NAME,
        Key: marshall({ id }),
        UpdateExpression: 'set #location = :location',
        ExpressionAttributeValues: {
          ':location': { S: requestBodyValue }
        },
        ExpressionAttributeNames: { '#location': requestBodyKey },
        ReturnValues: 'UPDATED_NEW'
      })
    )

    return {
      statusCode: 200,
      body: JSON.stringify(unmarshall(updateResult.Attributes))
    }
  } else {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: 'Bad request' })
    }
  }
}
