import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { startDrag, endDrag } from '../store'

export const Pin = (props) => {
  const { pin, activePin, handleMouseDown, handleMouseUp } = props
  const { xPos, yPos, zPos } = pin

  const pinStyle = {
    top: `${yPos}px`,
    left: `${xPos}px`,
    zIndex: `${zPos}`,
    position: 'absolute',
    backgroundImage: `url('/img/pushpin-small.png')`,
    height: '40px',
    width: '40px',
    cursor: 'move',
  }

  return (
    <div
      className="pushpin"
      style={pinStyle}
      draggable="true"
      onMouseDown={() => {handleMouseDown(pin)}}
      onMouseUp={() => {handleMouseUp(pin, activePin)}}
    />
  )
}

const mapStateToProps = function (state) {
  return {
    activePin: state.pin,
    isDragging: state.pin.isDragging
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleMouseDown(pin) {
      dispatch(startDrag(pin))
    },
    handleMouseUp(pin, activePin) {
      if (pin.id === activePin.id) {
        dispatch(endDrag(pin))
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatch)(Pin)


Pin.propTypes = {
  pin: PropTypes.shape({
    xPos: PropTypes.number,
    yPos: PropTypes.number,
    zPos: PropTypes.number,
    id: PropTypes.number
  })
}
