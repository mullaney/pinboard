const router = require('express').Router()
const { Board } = require('../db/models')

// GET /api/boards/
router.get('/', (req, res, next) =>
  Board.findAll()
    .then(boards => res.json(boards))
    .catch(next)
)

// GET /api/boards/:id
router.get('/:id', (req, res, next) => {
  Board.findById(req.params.id)
    .then(board => res.json(board))
    .catch(next)
})

module.exports = router
