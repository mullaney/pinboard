import reducer, { gotBoards, fetchBoards } from './boards'
import { expect } from 'chai'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('Boards store', () => {
  describe('action creators', () => {
    let boards = []
    let action = {}

    beforeEach(() => {
      boards = [{ title: 'Pictures'}, { title: 'Interesting Links' }]
      action = gotBoards(boards)
    })

    it('should return correct type', () => {
      expect(action.type).to.be.equal('GOT_BOARDS')
    })
  })

  describe('thunks', () => {
    let store, mockAxios

    const initialState = { boards: [] }

    beforeEach(() => {
      mockAxios = new MockAdapter(axios)
      store = mockStore(initialState)
    })

    afterEach(() => {
      mockAxios.restore()
      store.clearActions()
    })

    describe('fetchBoards', () => {
      it('dispatches the GOT_BOARDS action', () => {
        const fakeBoards = [{title: 'links', id: 1}]
        mockAxios.onGet('/api/boards').replyOnce(200, fakeBoards)
        return store.dispatch(fetchBoards())
          .then(() => {
            const actions = store.getActions()
            expect(actions[0].type).to.be.equal('GOT_BOARDS')
            expect(actions[0].boards).to.deep.equal(fakeBoards)
          })
      })
    })
  })

  describe('reducer', () => {
    const state = []
    const boards = [{id: 1, title: 'pictures'}, {id: 2, title: 'links'}]

    it('should replace the array of boards in state with fetched boards', () => {
      const newState = reducer(state, {
        type: 'GOT_BOARDS',
        boards
      })
      expect(newState).to.be.deep.equal([{id: 1, title: 'pictures'}, {id: 2, title: 'links'}])
    })
  })
})
