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
    body: JSON.stringify({ banana: 'Delaware' })
  } as any,
  {} as any
)
  .then((data) => {
    const body = JSON.parse(data.body)
    console.log()
  })
  .catch((error) => {
    console.log(error)
  })
