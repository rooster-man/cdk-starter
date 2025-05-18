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
    httpMethod: 'POST',
    body: JSON.stringify({ banana: 'Delaware' })
  } as any,
  {} as any
)
  .then((data) => {
    console.log(data)
  })
  .catch((error) => {
    console.log(error)
  })
