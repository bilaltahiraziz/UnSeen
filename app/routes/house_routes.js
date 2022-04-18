// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for houses
const House = require('../models/house')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { house: { title: '', text: 'foo' } } -> { house: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// INDEX
// GET /houses
router.get('/houses', requireToken, (req, res, next) => {
  House.find()
    .then(houses => {
      // `houses` will be an array of Mongoose documents
      // we want to convert each one to a POJO, so we use `.map` to
      // apply `.toObject` to each one
      return houses.map(house => house.toObject())
    })
    // respond with status 200 and JSON of the houses
    .then(houses => res.status(200).json({ houses: houses }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// SHOW
// GET /houses/5a7db6c74d55bc51bdf39793
router.get('/houses/:id', requireToken, (req, res, next) => {
  // req.params.id will be set based on the `:id` in the route
  House.findById(req.params.id)
    .then(handle404)
    // if `findById` is successful, respond with 200 and "house" JSON
    .then(house => res.status(200).json({ house: house.toObject() }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// CREATE
// POST /houses
router.post('/houses', requireToken, (req, res, next) => {
  // set owner of new house to be current user
  req.body.house.owner = req.user.id

  House.create(req.body.house)
    // respond to successful `create` with status 201 and JSON of new "house"
    .then(house => {
      res.status(201).json({ house: house.toObject() })
    })
    // if an error occurs, pass it off to our error handler
    // the error handler needs the error message and the `res` object so that it
    // can send an error message back to the client
    .catch(next)
})

// UPDATE
// PATCH /houses/5a7db6c74d55bc51bdf39793
router.patch('/houses/:id', requireToken, removeBlanks, (req, res, next) => {
  // if the client attempts to change the `owner` property by including a new
  // owner, prevent that by deleting that key/value pair
  delete req.body.houses.owner

  House.findById(req.params.id)
    .then(handle404)
    .then(house => {
      // pass the `req` object and the Mongoose record to `requireOwnership`
      // it will throw an error if the current user isn't the owner
      requireOwnership(req, house)

      // pass the result of Mongoose's `.update` to the next `.then`
      return house.updateOne(req.body.houses)
    })
    // if that succeeded, return 204 and no JSON
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// DESTROY
// DELETE /houses/5a7db6c74d55bc51bdf39793
router.delete('/houses/:id', requireToken, (req, res, next) => {
  House.findById(req.params.id)
    .then(handle404)
    .then(house => {
      // throw an error if current user doesn't own `house`
      requireOwnership(req, house)
      // delete the house ONLY IF the above didn't throw
      house.deleteOne()
    })
    // send back 204 and no content if the deletion succeeded
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

module.exports = router
