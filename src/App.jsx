import { useState } from 'react'
import ColorPicker from "./ColorPicker.jsx"
import Pixel from "./Pixel.jsx"

//
import {ApolloClient, HttpLink, InMemoryCache} from 'apollo-boost'
import gql from 'graphql-tag'

const endPointUrl = 'http://localhost:9000/graphql'
const client = new ApolloClient({
  link: new HttpLink({uri: endPointUrl}),
  cache: new InMemoryCache(),
})

async function loadPixelsAsync() {
  const query = gql`
      query {
          pixels {
              id
              color
          }
      }
  `
  const {data: {pixels}} = await client.query({query})
  console.log("data:pixels", pixels)
  return pixels
}

async function updatePixelAsync(id, color) {
  const mutation = gql`
      mutation($id: ID!, $color: String!) {
          updatePixel(id: $id, color: $color) {
              id
              color
          }
      }
  `
  const {data: {updatePixel}} = await client.mutate({mutation, variables: { id, color } })
  console.log("data:updatePixel", updatePixel)
  return updatePixel
}

//

const pixels = new Array(400).fill("white")

function App() {
  const [color, changeColor] = useState("white")

  return (
    <div className="content">
      <p>Pick a Color</p>
      <ColorPicker changeColor={changeColor} />
      <p>Click a Pixel</p>
      <div className="container">
        {pixels.map((pixel, idx) => (
          <Pixel color={pixel} key={idx} newColor={color} />
        ))}
      </div>
      <p>Apollo GraphQL</p>
      <input className="btn" type="button"  value="Load Pixels" onClick={loadPixelsAsync}/>
      <input className="btn" type="button"  value="Update Pixel" onClick={() => updatePixelAsync("6", "purple")}/>
    </div>
  )
}

export default App
