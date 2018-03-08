const router = require('express').Router()
const { Board, Pin } = require('../db/models')

// GET /api/boards/
router.get('/', (req, res, next) =>
  Board.findAll()
    .then(boards => res.json(boards))
    .catch(next)
)

// GET /api/boards/:id
router.get('/:id', (req, res, next) => {
  Board.findById(req.params.id, {
    include: [{ model: Pin }]
  })
    .then(board => res.json(board))
    .catch(next)
})

module.exports = router
