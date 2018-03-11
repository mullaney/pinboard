import axios from 'axios'
import { deleteBoardPin } from './index'

const GOT_PIN = 'GOT_PIN'
const SET_IS_DRAGGING = 'SET_IS_DRAGGING'
const SET_IS_EDITING = 'SET_IS_EDITING'
const PIN_DELETED = 'PIN_DELETED'

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

export const pinDeleted = pin => {
  return {
    type: PIN_DELETED,
    pin
  }
}

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
      .catch(err => console.error(err))

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
    dispatch(setIsEditing(false))
    dispatch(updatePin(pin))
  }

/*
  Reducer
  */

export default function (state = initialState, action) {
  switch (action.type) {

    case SET_IS_DRAGGING:
      return {...state, isDragging: action.isDragging}

    case SET_IS_EDITING:
      return {...state, isEditing: action.isEditing}

    case GOT_PIN:
      return {...state, ...action.pin }

    default:
      return state
  }
}
