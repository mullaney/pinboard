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
  },
  noteColor: {
    type: Sequelize.TEXT,
    defaultValue: 'lightyellow'
  }
})

module.exports = Pin
