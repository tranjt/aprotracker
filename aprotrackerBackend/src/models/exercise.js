const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3
  },
  type: {
    type: String,
    required: true,
    minlength: 3
  },
  description: String,
  createdAt: { type: Date, default: Date.now },
  routine: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Routine'
  },
  sets: [{
    kg: Number,
    reps: Number,
    time: String
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

module.exports = mongoose.model('Exercise', schema)