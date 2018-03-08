import axios from 'axios'

const GOT_BOARDS = 'GOT_BOARDS'

const initialState = []

export const gotBoards = boards => ({
  type: GOT_BOARDS,
  boards
})

export const fetchBoards = () =>
  dispatch =>
    axios.get('/api/boards')
      .then(res => res.data)
      .then(boards => {
        dispatch(gotBoards(boards))
      })

export default function (state = initialState, action) {
  switch (action.type) {

    case GOT_BOARDS:
      return action.boards

    default:
      return state
  }
}
