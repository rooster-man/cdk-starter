import { AuthService } from './auth-service'

const testAuth = async () => {
  const service = new AuthService()
  const loginResult = await service.signIn('testuser', 'Banana5000$')
  const idToken = await service.getIdToken()
  const jwtToken = await service.getJwtToken()
  console.log(idToken)
  console.log(jwtToken)
  return false
}

testAuth()
