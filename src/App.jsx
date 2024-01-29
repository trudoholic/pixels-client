import { useState } from "react"
import {loadPixelsAsync} from "./Client.js"
import ColorPicker from "./ColorPicker.jsx"
import Pixel from "./Pixel.jsx"

const pixels = [...Array(400).keys()].map(k => ({id: "" + k, color: ""}))

function App() {
  const [color, changeColor] = useState("white")

  return (
    <div className="content">
      <p>Pick a Color</p>
      <ColorPicker changeColor={changeColor} />
      <p>Click a Pixel</p>
      <div className="container">
        {pixels.map(pixel => (
          <Pixel {...pixel} key={pixel.id} newColor={color} />
        ))}
      </div>
      <p>Apollo GraphQL</p>
      <input className="btn" type="button"  value="Load Pixels" onClick={loadPixelsAsync}/>
    </div>
  )
}

export default App
