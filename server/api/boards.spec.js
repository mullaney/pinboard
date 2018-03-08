import { expect } from 'chai'
const db = require('../db')
const Board = db.model('board')
const app = require('../index')
const request = require('supertest')

describe('Board routes', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })

  describe('GET /api/boards', () => {
    const boards = [{ title: 'Pictures'}, { title: 'Interesting Links' }]

    beforeEach(() => Board.bulkCreate(boards))

    it('should return all the boards', () => {
      return request(app)
        .get('/api/boards')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body.length).to.be.equal(2)
        })
    })
  })

  describe('GET /api/boards/:id', () => {
    const boards = [{ title: 'Pictures'}]

    beforeEach(() => Board.bulkCreate(boards))

    it('should return all the boards', () => {
      return request(app)
        .get('/api/boards/1')
        .expect(200)
        .then(res => {
          expect(res.body.title).to.equal('Pictures')
          expect(res.body.pins).to.be.an('array')
        })
    })
  })
})
