import db from '../'
const BulletinBoard = db.model('bulletinBoard')
import { expect } from 'chai'

describe('BulletinBoard model', () => {
  describe('properties', () => {
    it('should have a title', () => {
      expect(BulletinBoard.attributes.title).to.be.an('object')
      expect(BulletinBoard.attributes.title.allowNull).to.equal(false)
      expect(BulletinBoard.attributes.title.notEmpty).to.equal(true)
    })
  })
})
