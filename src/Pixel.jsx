import { useState } from "react"
import PropTypes from 'prop-types'

const Pixel = ({ color, newColor }) => {// id,
  const [pixelColor, changeColor] = useState(color)
  return (
    <span
      className="pixel"
      onClick={() => {
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
