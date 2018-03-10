const router = require('express').Router()
const { Pin } = require('../db/models')

// POST /api/pins/
router.post('/', (req, res, next) => {
  Pin.create(req.body)
  .then((newPin) => res.status(201).json(newPin))
  .catch(next)
})

// PUT /api/pins/:id
router.put('/:id', (req, res, next) => {
  Pin.findById(req.params.id)
  .then(pin => {
    return pin.update(req.body)
  })
  .then(pin => res.json(pin))
  .catch(next)
})


module.exports = router
