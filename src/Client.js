import {ApolloClient, HttpLink, InMemoryCache} from 'apollo-boost'
import gql from 'graphql-tag'

const endPointUrl = 'http://localhost:9000/graphql'
const client = new ApolloClient({
  link: new HttpLink({uri: endPointUrl}),
  cache: new InMemoryCache(),
})

export async function loadPixelsAsync() {
  const query = gql`
      query {
          pixels {
              id
              color
          }
      }
  `
  const {data: {pixels}} = await client.query({query})
  // console.log("data:pixels", pixels)
  return pixels
}

export async function updatePixelAsync(id, color) {
  const mutation = gql`
      mutation($id: ID!, $color: String!) {
          updatePixel(id: $id, color: $color) {
              id
              color
          }
      }
  `
  const {data: {updatePixel}} = await client.mutate({mutation, variables: { id, color } })
  // console.log("data:updatePixel", updatePixel)
  return updatePixel
}
