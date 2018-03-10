import axios from 'axios'

const GOT_PIN = 'GOT_PIN'
const SET_IS_DRAGGING = 'SET_IS_DRAGGING'


const initialState = {
  isDragging: false,
  pin: {}
}

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


/*
  Reducer
  */

export default function (state = initialState, action) {
  switch (action.type) {

    case GOT_PIN:
      return {...state, pin: action.pin }

    default:
      return state
  }
}
