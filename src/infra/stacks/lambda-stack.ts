import { Stack, StackProps } from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { Code, Runtime } from 'aws-cdk-lib/aws-lambda'
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway'
import { ITable } from 'aws-cdk-lib/aws-dynamodb'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import { PolicyStatement } from 'aws-cdk-lib/aws-iam'

interface LambdaStackProps extends StackProps {
  spacesTable: ITable
}

export class LambdaStack extends Stack {
  public readonly spacesLambdaIntegration: LambdaIntegration

  constructor(scope: Construct, id: string, props: LambdaStackProps) {
    super(scope, id, props)

    const spacesLambda = new NodejsFunction(this, 'SpacesLambda', {
      entry: 'src/services/spaces/handler.ts',
      handler: 'handler',
      runtime: Runtime.NODEJS_20_X,
      environment: {
        TABLE_NAME: props.spacesTable.tableName
      }
    })

    this.spacesLambdaIntegration = new LambdaIntegration(spacesLambda)
  }
}
