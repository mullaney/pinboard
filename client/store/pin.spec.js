// import { gotBoard, fetchBoard } from './board'
import reducer, { gotPin, updatePin } from './pin'
import { expect } from 'chai'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('Pin store', () => {
  describe('action creators', () => {
    let pin = {}
    let action = {}

    beforeEach(() => {
      pin = { xPos: 1, yPos: 2, zPos: 3 }
      action = gotPin(pin)
    })

    it('gotPin should return correct type', () => {
      expect(action.type).to.be.equal('GOT_PIN')
    })
  })

  describe('thunks', () => {
    let store, mockAxios

    const initialState = { xPos: 1, yPos: 2, zPos: 3 }

    beforeEach(() => {
      mockAxios = new MockAdapter(axios)
      store = mockStore(initialState)
    })

    afterEach(() => {
      mockAxios.restore()
      store.clearActions()
    })

    describe('updatePin', () => {
      it('dispatches the GOT_PIN action', () => {
        const fakePin = { xPos: 10, yPos: 2, zPos: 3, boardId: 2 }
        mockAxios.onPut('/api/pins/1').replyOnce(204, fakePin)
        return store.dispatch(updatePin(1, { xPos: 10 }))
          .then(() => {
            const actions = store.getActions()
            expect(actions[0].type).to.be.equal('GOT_PIN')
            expect(actions[0].pin.xPos).to.equal(10)
          })
      })
    })
  })

  describe('reducer', () => {
    const state = {}
    const pin = { xPos: 10, yPos: 2, zPos: 3, boardId: 2 }

    it('should replace the state with the active pin', () => {
      const newState = reducer(state, {
        type: 'GOT_PIN',
        pin
      })
      expect(newState).to.be.deep.equal({ xPos: 10, yPos: 2, zPos: 3, boardId: 2 })
    })
  })
})
