import React from 'react'

const Pin = (props) => {
  console.log('props: ', props)
  const { x, y, z } = props
  const style = {
    top: `${y}px`,
    left: `${x}px`,
    zIndex: `${z}`,
    position: 'absolute',
    color: 'red',
  }
  return (
    <i className="fas fa-thumbtack pin" style={style} />
  )
}

export default Pin
