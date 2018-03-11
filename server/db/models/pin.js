const Sequelize = require('sequelize')
const db = require('../db')

const Pin = db.define('pin', {
  xPos: {
    type: Sequelize.INTEGER
  },
  yPos: {
    type: Sequelize.INTEGER
  },
  zPos: {
    type: Sequelize.INTEGER
  },
  note: {
    type: Sequelize.TEXT,
    defaultValue: 'A new note'
  }
})

module.exports = Pin
