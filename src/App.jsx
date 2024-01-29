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

async function updatePixelAsync() {
  const mutation = gql`
      mutation {
          updatePixel(id:"1", color: "yellow") {
              id
              color
          }
      }
  `
  const {data: {updatePixel}} = await client.mutate({mutation})
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
      <input type="button"  value="Load Pixels" onClick={loadPixelsAsync}/>
      <input type="button"  value="Update Pixel" onClick={updatePixelAsync}/>
    </div>
  )
}

export default App
