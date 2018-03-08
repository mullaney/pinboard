import React from 'react'

const Pin = (props) => {
  console.log('props: ', props)
  const { xPos, yPos, zPos } = props
  const style = {
    top: `${yPos}px`,
    left: `${xPos}px`,
    zIndex: `${zPos}`,
    position: 'absolute',
    color: 'red',
  }
  return (
    <i className="fas fa-thumbtack pin" style={style} />
  )
}

export default Pin
