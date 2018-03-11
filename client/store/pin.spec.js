// import { gotBoard, fetchBoard } from './board'
import reducer, {
  gotPin,
  updatePin,
  setIsDragging,
  startDrag,
  endDrag,
  setIsEditing,
  startEditMode,
  endEditMode
} from './pin'

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

    it('gotPin should return correct action type and pin', () => {
      pin = { xPos: 1, yPos: 2, zPos: 3 }
      action = gotPin(pin)
      expect(action.type).to.be.equal('GOT_PIN')
      expect(action.pin).to.deep.equal({ xPos: 1, yPos: 2, zPos: 3 })
    })

    it('setIsDragging should return correct action type and value for isDragging', () => {
      action = setIsDragging(true)
      expect(action.type).to.be.equal('SET_IS_DRAGGING')
      expect(action.isDragging).to.deep.equal(true)

      action = setIsDragging(false)
      expect(action.type).to.be.equal('SET_IS_DRAGGING')
      expect(action.isDragging).to.deep.equal(false)
    })

    it('setIsEditing should return correct action type and value for isEditing', () => {
      action = setIsEditing(true)
      expect(action.type).to.be.equal('SET_IS_EDITING')
      expect(action.isEditing).to.deep.equal(true)

      action = setIsEditing(false)
      expect(action.type).to.be.equal('SET_IS_EDITING')
      expect(action.isEditing).to.deep.equal(false)
    })
  })

  describe('thunks', () => {
    let store, mockAxios

    const initialState = {
      isDragging: false,
      pin: { xPos: 1, yPos: 2, zPos: 3 }
    }

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

      return store.dispatch(updatePin({ id: 1, xPos: 10 }))
          .then(() => {
            const actions = store.getActions()
            expect(actions[0].type).to.be.equal('GOT_PIN')
            expect(actions[0].pin.xPos).to.equal(10)
          })
      })
    })

    describe('startDrag', () => {
      it('dispatches two actions, GOT_PIN and SET_IS_DRAGGING', () => {
        const pin = { xPos: 10, yPos: 2, zPos: 3, boardId: 2 }

        store.dispatch(startDrag(pin))
        const actions = store.getActions()

        expect(actions[0].type).to.be.equal('GOT_PIN')
        expect(actions[0].pin).to.deep.equal({ xPos: 10, yPos: 2, zPos: 3, boardId: 2 })
        expect(actions[1].type).to.be.equal('SET_IS_DRAGGING')
        expect(actions[1].isDragging).to.equal(true)
      })
    })

    describe('startEditMode', () => {
      it('dispatches two actions, GOT_PIN and SET_IS_EDITING', () => {
        const pin = { xPos: 10, yPos: 2, zPos: 3, boardId: 2, id: 1 }

        store.dispatch(startEditMode(pin))
        const actions = store.getActions()

        expect(actions[0].type).to.be.equal('GOT_PIN')
        expect(actions[0].pin).to.deep.equal({ xPos: 10, yPos: 2, zPos: 3, boardId: 2, id: 1 })
        expect(actions[1].type).to.be.equal('SET_IS_EDITING')
        expect(actions[1].isEditing).to.equal(true)
      })
    })

    describe('endDrag', () => {
      it('dispatches two actions, GOT_PIN and SET_IS_DRAGGING', () => {
        const pin = { xPos: 10, yPos: 2, zPos: 3, boardId: 2, id: 1 }

        store.dispatch(endDrag(pin))
        const actions = store.getActions()

        expect(actions[0].type).to.be.equal('GOT_PIN')
        expect(actions[0].pin).to.deep.equal({ xPos: 10, yPos: 2, zPos: 3, boardId: 2, id: 1 })
        expect(actions[1].type).to.be.equal('SET_IS_DRAGGING')
        expect(actions[1].isDragging).to.equal(false)
      })
    })

    describe('endEditMode', () => {
      it('dispatches two actions, GOT_PIN and SET_IS_EDITING', () => {
        const pin = { xPos: 10, yPos: 2, zPos: 3, boardId: 2, id: 1 }

        store.dispatch(endEditMode(pin))
        const actions = store.getActions()

        expect(actions[0].type).to.be.equal('SET_IS_EDITING')
        expect(actions[0].isEditing).to.equal(false)
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

    it('should change the value for isDragging', () => {
      const newState = reducer(state, {
        type: 'SET_IS_DRAGGING',
        isDragging: true
      })
      expect(newState).to.be.deep.equal({ isDragging: true })
    })

    it('should change the value for isEditing', () => {
      const newState = reducer(state, {
        type: 'SET_IS_EDITING',
        isEditing: true
      })
      expect(newState).to.be.deep.equal({ isEditing: true })
    })

    xit('should NOT change the value for isEditing if isDragging is true', () => {
      const newState = reducer({ isDragging: true }, {
        type: 'SET_IS_EDITING',
        isEditing: true
      })
      expect(newState).to.be.deep.equal({ isDragging: true, isEditing: false })
    })

    xit('should NOT change the value for isDraggin if isEditing is true', () => {
      const newState = reducer({ isEditing: true }, {
        type: 'SET_IS_DRAGGING',
        isDragging: true
      })
      expect(newState).to.be.deep.equal({ isDragging: false, isEditing: true })
    })
  })
})
