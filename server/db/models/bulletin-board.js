const Sequelize = require('sequelize')
const db = require('../db')

const BulletinBoard = db.define('bulletinBoard', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    notEmpty: true
  }
})

module.exports = BulletinBoard
