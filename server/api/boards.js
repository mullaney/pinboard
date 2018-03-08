const router = require('express').Router()
const { Board } = require('../db/models')

// GET /api/boards/
router.get('/', (req, res, next) =>
  Board.findAll()
    .then(boards => res.json(boards))
    .catch(next)
)

module.exports = router
