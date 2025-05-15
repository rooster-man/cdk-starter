import { APIGatewayProxyEvent, Context } from 'aws-lambda'
import { v4 } from 'uuid'
import { S3Client, ListBucketsCommand } from '@aws-sdk/client-s3'

const s3Client = new S3Client({ region: 'us-east-1' })

async function handler(event: APIGatewayProxyEvent, context: Context) {
  const command = new ListBucketsCommand({})
  const response = await s3Client.send(command)

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello, world!' + JSON.stringify(response.Buckets)
    })
  }
}

export { handler }
