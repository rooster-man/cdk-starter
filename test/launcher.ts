import { handler } from '../src/services/spaces/handler'

handler(
  {
    httpMethod: 'POST',
    body: JSON.stringify({ location: 'Connecticut' })
  } as any,
  {} as any
)
