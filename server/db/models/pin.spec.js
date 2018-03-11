import db from '../'
const Pin = db.model('pin')
import { expect } from 'chai'

describe('Pin model', () => {
  describe('properties', () => {
    it('should have a xPos', () => {
      expect(Pin.attributes.xPos).to.be.an('object')
    })
    it('should have a yPos', () => {
      expect(Pin.attributes.yPos).to.be.an('object')
    })
    it('should have a zPos', () => {
      expect(Pin.attributes.zPos).to.be.an('object')
    })
    it('should have a note', () => {
      expect(Pin.attributes.note).to.be.an('object')
    })
  })
})
