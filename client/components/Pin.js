import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { startDrag, endDrag } from '../store'
import { markdown } from 'markdown'

export const Pin = (props) => {
  const { pin, activePin, handleMouseDown, handleMouseUp, createMarkup } = props
  const { xPos, yPos, zPos, note, noteColor } = pin

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

  const noteStyle = {
    top: `${yPos + 25}px`,
    left: `${xPos - 100}px`,
    zIndex: `${zPos - 1}`,
    position: 'absolute',
    backgroundColor: `${noteColor}`,
    padding: '1rem',
    width: '240px',
    cursor: 'edit',
    boxShadow: '1px 1px 3px rgba(0, 0, 0, 18)'
  }

  return (
    <div>
      <div
        className="pushpin"
        style={pinStyle}
        draggable="true"
        onMouseDown={() => {handleMouseDown(pin)}}
        onMouseUp={() => {handleMouseUp(pin, activePin)}}
      />
      <div style={noteStyle} dangerouslySetInnerHTML={createMarkup(note)} />
    </div>
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
    },
    createMarkup(note) {
      return {__html: markdown.toHTML(note)}
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
