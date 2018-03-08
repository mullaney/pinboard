const Sequelize = require('sequelize')
const db = require('../db')

const Board = db.define('Board', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    notEmpty: true
  }
})

module.exports = Board
