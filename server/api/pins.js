const router = require('express').Router()
const { Pin } = require('../db/models')

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
