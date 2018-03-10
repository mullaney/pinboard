import axios from 'axios'

const GOT_BOARD = 'GOT_BOARD'
const UPDATE_BOARD_PIN = 'UPDATE_BOARD_PIN'

const initialState = {
  pins: []
}

export const gotBoard = board => ({
  type: GOT_BOARD,
  board
})

export const updateBoardPin = pin => ({
  type: UPDATE_BOARD_PIN,
  pin
})

export const fetchBoard = (id) =>
  dispatch =>
    axios.get(`/api/boards/${id}`)
      .then(res => res.data)
      .then(board => {
        dispatch(gotBoard(board))
      })

export default function (state = initialState, action) {
  let pins = state.pins
  switch (action.type) {
    case UPDATE_BOARD_PIN:
      pins = pins.filter(pin => pin.id !== action.pin.id)
      return {...state, pins: [...pins, action.pin]}

    case GOT_BOARD:
      return action.board

    default:
      return state
  }
}
