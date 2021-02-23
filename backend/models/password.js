const mongoose = require('mongoose')
const Schema = mongoose.Schema

const passwordSchema = new Schema({
  password: { type: Number, required: true },
})

module.exports = mongoose.model('passwords', passwordSchema)
