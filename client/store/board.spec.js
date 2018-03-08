import reducer, { gotBoard, fetchBoard } from './board'
import { expect } from 'chai'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('Board store', () => {
  describe('action creators', () => {
    let board = {}
    let action = {}

    beforeEach(() => {
      board = { title: 'Pictures'}
      action = gotBoard(board)
    })

    it('should return correct type', () => {
      expect(action.type).to.be.equal('GOT_BOARD')
    })
  })

  describe('thunks', () => {
    let store, mockAxios

    const initialState = { board: {} }

    beforeEach(() => {
      mockAxios = new MockAdapter(axios)
      store = mockStore(initialState)
    })

    afterEach(() => {
      mockAxios.restore()
      store.clearActions()
    })

    describe('fetchBoard', () => {
      it('dispatches the GOT_BOARD action', () => {
        const fakeBoard = {title: 'links', id: 1}
        mockAxios.onGet('/api/boards/1').replyOnce(200, fakeBoard)
        return store.dispatch(fetchBoard(1))
          .then(() => {
            const actions = store.getActions()
            expect(actions[0].type).to.be.equal('GOT_BOARD')
            expect(actions[0].board).to.deep.equal(fakeBoard)
          })
      })
    })
  })

  describe('reducer', () => {
    const state = []
    const board = {id: 1, title: 'pictures'}

    it('should replace the array of board in state with fetched board', () => {
      const newState = reducer(state, {
        type: 'GOT_BOARD',
        board
      })
      expect(newState).to.be.deep.equal({id: 1, title: 'pictures'})
    })
  })
})
