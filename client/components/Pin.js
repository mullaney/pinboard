import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { startDrag, endDrag, startEditMode } from '../store'
import { markdown } from 'markdown'
import { EditNote } from './'

export const Pin = (props) => {
  const { pin, activePin, handleMouseDown, handleMouseUp, createMarkup, handleStartEdit, isEditing } = props
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
    backgroundColor: `${noteColor}`,
  }

  return (
    <div className="">
      <div
        className="pushpin"
        style={pinStyle}
        draggable="true"
        onMouseDown={() => {handleMouseDown(pin)}}
        onMouseUp={() => {handleMouseUp(pin, activePin)}}
      />
      {
        activePin.id === pin.id && isEditing ? <EditNote note={note} noteStyle={noteStyle} /> : (
          <div
            className="pin-note"
            onClick={() => {handleStartEdit(pin)}}
            style={noteStyle}
            dangerouslySetInnerHTML={createMarkup(note)} // eslint-disable-line
          />
        )
      }

    </div>
  )
}

const mapStateToProps = function (state) {
  return {
    activePin: state.pin,
    isDragging: state.pin.isDragging,
    isEditing: state.pin.isEditing
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
    },
    handleStartEdit(pin) {
      dispatch(startEditMode(pin))
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
