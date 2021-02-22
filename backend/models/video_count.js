const mongoose = require('mongoose')
const Schema = mongoose.Schema

const videoCountSchema = new Schema({
  name: { type: String, required: true },
  count: { type: Number, required: true },
  // dabCount: { type: Number, required: true },
  // elbowKickCount: { type: Number, required: true },
  // gunCount: { type: Number, required: true },
  // hairCount: { type: Number, required: true },
  // listenCount: { type: Number, required: true },
  // pointHighCount: { type: Number, required: true },
  // sidePumpCount: { type: Number, required: true },
  // wipeTableCount: { type: Number, required: true },
})

module.exports = mongoose.model('VideoCount', videoCountSchema)
