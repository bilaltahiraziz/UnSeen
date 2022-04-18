const mongoose = require('mongoose')

const houseSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  structure: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('House', houseSchema)
