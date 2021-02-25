const mongoose = require('mongoose')
const Schema = mongoose.Schema

const dummyDataSchema = new Schema({
  xAxis: { type: Number, required: true },
  yAxis: { type: Number, required: true },
  zAxis: { type: Number, required: true },
  danceMove: { type: String, required: true },
  position: [{ type: Number, required: true }],
})

module.exports = mongoose.model('DummyData2', dummyDataSchema)
