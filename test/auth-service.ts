import { Amplify } from 'aws-amplify'
import { SignInOutput, fetchAuthSession, signIn } from 'aws-amplify/auth'

const awsRegion = 'us-east-1'

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: 'us-east-1_IkUKHoqgB',
      userPoolClientId: '11gfl812q2r1p76oevkfev129n'
    }
  }
})

export class AuthService {
  public async signIn(username: string, password: string) {
    const result: SignInOutput = await signIn({
      username,
      password,
      options: {
        authFlow: 'USER_PASSWORD_AUTH'
      }
    })

    return result
  }

  public async getIdToken() {
    const session = await fetchAuthSession()
    return session.tokens?.idToken.toString()
  }

  public async getJwtToken() {
    const session = await fetchAuthSession()
    return session.tokens?.idToken?.payload
  }
}
