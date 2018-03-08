const Sequelize = require('sequelize')
const db = require('../db')

const Pin = db.define('Pin', {
  xPos: {
    type: Sequelize.INTEGER
  },
  yPos: {
    type: Sequelize.INTEGER
  },
  zPos: {
    type: Sequelize.INTEGER
  },
})

module.exports = Pin
