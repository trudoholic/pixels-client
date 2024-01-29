import { useState } from "react"
import PropTypes from 'prop-types'

const Pixel = ({ id, color, newColor }) => {
  const [pixelColor, changeColor] = useState(color || "white")
  return (
    <span
      className="pixel"
      onClick={() => {
        console.log("Click:", id)
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
