import { Stack, StackProps } from 'aws-cdk-lib'
import { Construct } from 'constructs'
import {
  Function as LambdaFunction,
  Code,
  Runtime,
} from 'aws-cdk-lib/aws-lambda'

export class LambdaStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    new LambdaFunction(this, 'HelloFunction', {
      code: Code.fromAsset('src/services'),
      handler: 'hello.main',
      runtime: Runtime.NODEJS_20_X,
    })
  }
}
