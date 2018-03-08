import React from 'react'

const Pin = (props) => {
  const { xPos, yPos, zPos } = props.pin
  const style = {
    top: `${yPos}px`,
    left: `${xPos}px`,
    zIndex: `${zPos}`,
    position: 'absolute',
    color: 'red',
  }
  return (
    <img src="/img/pushpin-small.png" alt="pin" style={style} />
  )
}

export default Pin
