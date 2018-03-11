import React from 'react'
import { connect } from 'react-redux'
import { endEditMode, updateBoardPin, deleteBoardPin } from '../store'

const EditNote = (props) => {
  const { activePin, handleBlur, note, noteStyle } = props
  const inputStyle = {
    width: '100%',
    fontSize: '1rem'
  }

  return (
    <div className="edit-pin" style={noteStyle}>
      <textarea rows="5" style={inputStyle} defaultValue={note} autoFocus onBlur={(event) => {handleBlur(event, activePin)}} />
    </div>
  )
}

const mapStateToProps = function (state) {
  return {
    activePin: state.pin,
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleBlur(event, pin) {
      const newNote = event.target.value
      if (newNote !== '') {
        pin.note = newNote
        dispatch(updateBoardPin(pin))
        dispatch(endEditMode(pin))
      } else {
        dispatch(endEditMode(pin))
        dispatch(deleteBoardPin(pin))
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatch)(EditNote)
