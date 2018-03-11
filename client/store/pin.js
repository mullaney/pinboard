import axios from 'axios'

const GOT_PIN = 'GOT_PIN'
const SET_IS_DRAGGING = 'SET_IS_DRAGGING'
const SET_IS_EDITING = 'SET_IS_EDITING'

const initialState = {}

/*
  Action Creators
  */

 export const gotPin = pin => ({
   type: GOT_PIN,
   pin
 })

 export const setIsDragging = isDragging => ({
   type: SET_IS_DRAGGING,
   isDragging
 })

 export const setIsEditing = isEditing => ({
   type: SET_IS_EDITING,
   isEditing
 })

/*
  Thunks
  */

export const updatePin = (pin) =>
  dispatch =>
    axios.put(`/api/pins/${pin.id}`, pin)
      .then(res => res.data)
      .then(updatedPin => {
        dispatch(gotPin(updatedPin))
      })

export const startDrag = (pin) =>
  dispatch => {
    dispatch(gotPin(pin))
    dispatch(setIsDragging(true))
  }

export const endDrag = (pin) =>
  dispatch => {
    dispatch(gotPin(pin))
    dispatch(setIsDragging(false))
  }

export const startEditMode = (pin) =>
  dispatch => {
    dispatch(gotPin(pin))
    dispatch(setIsEditing(true))
  }

export const endEditMode = (pin) =>
  dispatch => {
    dispatch(updatePin(pin))
    dispatch(setIsEditing(false))
  }


/*
  Reducer
  */

export default function (state = initialState, action) {
  switch (action.type) {

    case SET_IS_DRAGGING:
      return {...state, isDragging: action.isDragging && !state.isEditing}

    case SET_IS_EDITING:
      return {...state, isEditing: action.isEditing && !state.isDragging}

    case GOT_PIN:
      return {...state, ...action.pin }

    default:
      return state
  }
}
