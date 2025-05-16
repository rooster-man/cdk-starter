import { handler } from '../src/services/spaces/handler'

// handler(
//   {
//     httpMethod: 'POST',
//     body: JSON.stringify({ location: 'Connecticut' })
//   } as any,
//   {} as any
// )

handler(
  {
    httpMethod: 'GET',
    queryStringParameters: {
      id: '6ed10520-3aa5-41d8-b58b-26a44e302b08'
    }
  } as any,
  {} as any
)
