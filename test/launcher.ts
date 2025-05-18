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
    httpMethod: 'PUT',
    queryStringParameters: {
      id: '6ed10520-3aa5-41d8-b58b-26a44e302b08'
    },
    body: JSON.stringify({ location: 'Delaware' })
  } as any,
  {} as any
)
  .then((data) => {
    console.log(data)
  })
  .catch((error) => {
    console.log(error)
  })
