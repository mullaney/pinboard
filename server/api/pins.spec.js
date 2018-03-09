import { expect } from 'chai'
const db = require('../db')
const Pin = db.model('pin')
const Board = db.model('board')
const app = require('../index')
const request = require('supertest')

describe('Pin routes', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })

  describe('UPDATE /api/pins/:id', () => {
    const board = {title: 'my board', id: 1}
    const pin = {
      xPos: 100,
      yPos: 100,
      zPos: 9,
      boardId: 1,
      id: 1
    }

    let pinId

    beforeEach(() => {
      return Board.create(board)
      .then(() => {
        return Pin.create(pin)
        .then(newPin => {
          pinId = newPin.dataValues.id
        })
      })
    })

    it('should update an existing pin', () => {
      return request(app)
        .put(`/api/pins/${pinId}`)
        .send({ xPos: 20 })
        .expect(200)
        .then(res => {
          console.log('res.body', res.body)
          expect(res.body.xPos).to.equal(20)
        })
    })
  })
})
