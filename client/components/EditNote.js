import React from 'react'
import { connect } from 'react-redux'
import { endEditMode, updateBoardPin } from '../store'

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
      pin.note = event.target.value
      dispatch(updateBoardPin(pin))
      dispatch(endEditMode(pin))
    }
  }
}

export default connect(mapStateToProps, mapDispatch)(EditNote)
