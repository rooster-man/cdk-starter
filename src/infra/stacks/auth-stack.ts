import { CfnOutput, Stack, StackProps } from 'aws-cdk-lib'
import {
  CfnUserPoolGroup,
  UserPool,
  UserPoolClient
} from 'aws-cdk-lib/aws-cognito'
import { Construct } from 'constructs'

export class AuthStack extends Stack {
  public userPool: UserPool
  private userPoolClient: UserPoolClient

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    this.createCognitoUserPool()
    this.createUserPoolClient()
    this.createAdminGroup()
  }

  private createCognitoUserPool() {
    this.userPool = new UserPool(this, 'SpaceUserPool', {
      userPoolName: 'SpaceUserPool',
      selfSignUpEnabled: true,
      // autoVerify: { email: true },
      signInAliases: { email: true, username: true }
    })

    new CfnOutput(this, 'UserPoolId', {
      value: this.userPool.userPoolId
    })
  }

  private createUserPoolClient() {
    this.userPoolClient = this.userPool.addClient('SpaceUserPoolClient', {
      userPoolClientName: 'SpaceUserPoolClient',
      authFlows: {
        adminUserPassword: true,
        custom: true,
        userPassword: true,
        userSrp: true
      }
    })

    new CfnOutput(this, 'UserPoolClientId', {
      value: this.userPoolClient.userPoolClientId
    })
  }

  private createAdminGroup() {
    new CfnUserPoolGroup(this, 'AdminGroup', {
      groupName: 'admin',
      userPoolId: this.userPool.userPoolId
    })
  }
}
