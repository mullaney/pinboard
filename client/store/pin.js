import axios from 'axios'

const GOT_PIN = 'GOT_PIN'

const initialState = {}

export const gotPin = pin => ({
  type: GOT_PIN,
  pin
})

export const updatePin = (id, pinProps) =>
  dispatch =>
    axios.put(`/api/pins/${id}`, pinProps)
      .then(res => res.data)
      .then(pin => {
        dispatch(gotPin(pin))
      })

export default function (state = initialState, action) {
  switch (action.type) {

    case GOT_PIN:
      return action.pin

    default:
      return state
  }
}
