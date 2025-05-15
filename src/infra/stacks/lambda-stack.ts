import { Stack, StackProps } from 'aws-cdk-lib'
import { Construct } from 'constructs'
import {
  Function as LambdaFunction,
  Code,
  Runtime,
} from 'aws-cdk-lib/aws-lambda'
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway'

export class LambdaStack extends Stack {
  public readonly helloLambdaIntegration: LambdaIntegration

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    const helloLambda = new LambdaFunction(this, 'HelloFunction', {
      code: Code.fromAsset('src/services'),
      handler: 'hello.main',
      runtime: Runtime.NODEJS_20_X,
    })

    this.helloLambdaIntegration = new LambdaIntegration(helloLambda)
  }
}
