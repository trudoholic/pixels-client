import { useState } from "react"
import PropTypes from "prop-types"
import {updatePixelAsync} from "./Client.js"

const Pixel = ({ id, color, newColor }) => {
  const [pixelColor, changeColor] = useState(color || "white")
  return (
    <span
      className="pixel"
      onClick={async () => {
        console.log("Click:", id)
        await updatePixelAsync(id, newColor)
        changeColor(newColor)
      }}
      style={{backgroundColor: pixelColor}}
    />
  );
};

Pixel.propTypes = {
  id: PropTypes.string,
  color: PropTypes.string,
  newColor: PropTypes.string,
}

export default Pixel
