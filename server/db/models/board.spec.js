import db from '../'
const Board = db.model('board')
import { expect } from 'chai'

describe('Board model', () => {
  describe('properties', () => {
    it('should have a title', () => {
      expect(Board.attributes.title).to.be.an('object')
      expect(Board.attributes.title.allowNull).to.equal(false)
      expect(Board.attributes.title.notEmpty).to.equal(true)
    })
  })
})
