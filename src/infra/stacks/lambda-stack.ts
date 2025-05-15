import { Stack, StackProps } from 'aws-cdk-lib'
import { Construct } from 'constructs'
import {
  Function as LambdaFunction,
  Code,
  Runtime
} from 'aws-cdk-lib/aws-lambda'
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway'
import { ITable } from 'aws-cdk-lib/aws-dynamodb'

interface LambdaStackProps extends StackProps {
  spacesTable: ITable
}

export class LambdaStack extends Stack {
  public readonly helloLambdaIntegration: LambdaIntegration

  constructor(scope: Construct, id: string, props: LambdaStackProps) {
    super(scope, id, props)

    const helloLambda = new LambdaFunction(this, 'HelloFunction', {
      code: Code.fromAsset('src/services'),
      handler: 'hello.main',
      runtime: Runtime.NODEJS_20_X,
      environment: {
        TABLE_NAME: props.spacesTable.tableName
      }
    })

    this.helloLambdaIntegration = new LambdaIntegration(helloLambda)
  }
}
