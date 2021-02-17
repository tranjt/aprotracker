const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,    
    minlength: 3
  },
  description: String,
  createdAt: { type: Date, default: Date.now },
  duration: Number,
  exercises: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exercise'
  }]
  
})

module.exports = mongoose.model('Routine', schema)