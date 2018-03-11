import axios from 'axios'

const GOT_BOARD = 'GOT_BOARD'
const UPDATE_BOARD_PIN = 'UPDATE_BOARD_PIN'
const NEW_BOARD_PIN = 'NEW_BOARD_PIN'
const DELETE_PIN = 'DELETE_PIN'

const initialState = {
  pins: []
}

/*
  Action Creators
  */

export const gotBoard = board => ({
  type: GOT_BOARD,
  board
})

export const updateBoardPin = pin => ({
  type: UPDATE_BOARD_PIN,
  pin
})

export const newBoardPin = pin => ({
  type: NEW_BOARD_PIN,
  pin
})

export const deletedPin = pin => ({
  type: DELETE_PIN,
  pin
})

/*
  Thunks
  */

export const fetchBoard = (id) =>
  dispatch =>
    axios.get(`/api/boards/${id}`)
      .then(res => res.data)
      .then(board => {
        dispatch(gotBoard(board))
      })

export const createNewPin = (pin) =>
  dispatch =>
    axios.post('/api/pins/', pin)
      .then(res => res.data)
      .then(newPin => {
        dispatch(newBoardPin(newPin))
      })

export const deleteBoardPin = (pin) =>
  dispatch =>
    axios.delete(`/api/pins/${pin.id}`)
      .then(() => {
        dispatch(deletedPin(pin))
      })

/*
  Reducer
  */

export default function (state = initialState, action) {
  let pins = state.pins

  switch (action.type) {

    case DELETE_PIN:
      return {...state, pins: pins.filter(pin => pin.id !== action.pin.id)}

    case NEW_BOARD_PIN:
      return {...state, pins: [...pins, action.pin]}

    case UPDATE_BOARD_PIN:
      pins = pins.filter(pin => pin.id !== action.pin.id)
      return {...state, pins: [...pins, action.pin]}

    case GOT_BOARD:
      return action.board

    default:
      return state
  }
}
