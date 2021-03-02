const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },  
  passwordHash: {
    type: String,
    required: true
  },
  createdAt: { type: Date, default: Date.now },
})

schema.plugin(uniqueValidator)
module.exports = mongoose.model('User', schema)