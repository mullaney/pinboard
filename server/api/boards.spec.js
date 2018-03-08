import { expect } from 'chai'
const db = require('../db')
const BulletinBoard = db.model('Board')
const app = require('../index')
const request = require('supertest')

describe('Board routes', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })

  describe('/api/boards', () => {
    const boards = [

    ]
  })
})
