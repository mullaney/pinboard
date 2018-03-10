import reducer, {
  gotBoard,
  fetchBoard,
  updateBoardPin,
  newBoardPin,
  createNewPin
} from './board'

import { expect } from 'chai'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

// board = { title: 'Pictures', pins: [{id: 1, xPos: 334, yPos: 374, zPos: 6}] }

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('Board store', () => {

  describe('action creators', () => {
    let board = {}
    let action = {}
    let pin = {}

    it('gotBoard should return correct type and value', () => {
      board = { title: 'Pictures', pins: [{id: 1, xPos: 334, yPos: 374, zPos: 6}] }
      action = gotBoard(board)
      expect(action.type).to.equal('GOT_BOARD')
      expect(action.board).to.deep.equal({ title: 'Pictures', pins: [{id: 1, xPos: 334, yPos: 374, zPos: 6}] })
    })

    it('updateBoardPin should return correct type and value', () => {
      pin = {id: 1, xPos: 20, yPos: 20, zPos: 6}
      action = updateBoardPin(pin)
      expect(action.type).to.equal('UPDATE_BOARD_PIN')
      expect(action.pin).to.deep.equal({id: 1, xPos: 20, yPos: 20, zPos: 6})
    })

    it('newBoardPin should return correct type and value', () => {
      pin = {id: 1, xPos: 20, yPos: 20, zPos: 6}
      action = newBoardPin(pin)
      expect(action.type).to.equal('NEW_BOARD_PIN')
      expect(action.pin).to.deep.equal({id: 1, xPos: 20, yPos: 20, zPos: 6})
    })
  })

  describe('thunks', () => {
    let store, mockAxios
    const pin = {
      xPos: 100,
      yPos: 100,
      zPos: 9,
      boardId: 1,
      id: 1
    }

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

    describe('createNewPin', () => {
      it('dispatches the NEW_BOARD_PIN action', () => {
        const fakePin = pin
        mockAxios.onPost('/api/pins/').replyOnce(201, fakePin)
        return store.dispatch(createNewPin(pin))
          .then(() => {
            const actions = store.getActions()
            expect(actions[0].type).to.be.equal('NEW_BOARD_PIN')
            expect(actions[0].pin).to.deep.equal(fakePin)
          })
      })
    })
  })

  describe('reducer', () => {
    const state = {}
    const board = {
      title: 'Pictures',
      pins: [
        {id: 1, xPos: 334, yPos: 374, zPos: 6}
      ]
    }

    it('should replace the board in state with action.board', () => {
      const newState = reducer(state, {
        type: 'GOT_BOARD',
        board
      })
      expect(newState).to.be.deep.equal({
        title: 'Pictures',
        pins: [
          {id: 1, xPos: 334, yPos: 374, zPos: 6}
        ]
      })
    })

    it('should replace a board\'s pin with new properties', () => {
      const newState = reducer(board, {
        type: 'UPDATE_BOARD_PIN',
        pin: {id: 1, xPos: 99, yPos: 99, zPos: 6}
      })
      expect(newState).to.be.deep.equal({
        title: 'Pictures',
        pins: [
          {id: 1, xPos: 99, yPos: 99, zPos: 6}
        ]
      })
    })

    it('should add a pin to a board\'s pins array', () => {
      const newState = reducer(board, {
        type: 'NEW_BOARD_PIN',
        pin: {id: 2, xPos: 99, yPos: 99, zPos: 6}
      })
      expect(newState).to.be.deep.equal({
        title: 'Pictures',
        pins: [
          {id: 1, xPos: 334, yPos: 374, zPos: 6},
          {id: 2, xPos: 99, yPos: 99, zPos: 6}
        ]
      })
    })
  })
})
