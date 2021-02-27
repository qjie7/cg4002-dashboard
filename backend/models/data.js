const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DataSchema = new Schema({
  // Member 1 Left
  xAxisMemberOneLeftA: { type: Number, required: true },
  yAxisMemberOneLeftA: { type: Number, required: true },
  zAxisMemberOneLeftA: { type: Number, required: true },

  xAxisMemberOneLeftG: { type: Number, required: true },
  yAxisMemberOneLeftG: { type: Number, required: true },
  zAxisMemberOneLeftG: { type: Number, required: true },

  // Member 1 Right
  xAxisMemberOneRightA: { type: Number, required: true },
  yAxisMemberOneRightA: { type: Number, required: true },
  zAxisMemberOneRightA: { type: Number, required: true },

  xAxisMemberOneRightG: { type: Number, required: true },
  yAxisMemberOneRightG: { type: Number, required: true },
  zAxisMemberOneRightG: { type: Number, required: true },

  // Leader Left
  xAxisLeaderLeftA: { type: Number, required: true },
  yAxisLeaderLeftA: { type: Number, required: true },
  zAxisLeaderLeftA: { type: Number, required: true },

  xAxisLeaderLeftG: { type: Number, required: true },
  yAxisLeaderLeftG: { type: Number, required: true },
  zAxisLeaderLeftG: { type: Number, required: true },

  // Leader Right
  xAxisLeaderRightA: { type: Number, required: true },
  yAxisLeaderRightA: { type: Number, required: true },
  zAxisLeaderRightA: { type: Number, required: true },

  xAxisLeaderRightG: { type: Number, required: true },
  yAxisLeaderRightG: { type: Number, required: true },
  zAxisLeaderRightG: { type: Number, required: true },

  // Member 2 Left
  xAxisMemberTwoLeftA: { type: Number, required: true },
  yAxisMemberTwoLeftA: { type: Number, required: true },
  zAxisMemberTwoLeftA: { type: Number, required: true },

  xAxisMemberTwoLeftG: { type: Number, required: true },
  yAxisMemberTwoLeftG: { type: Number, required: true },
  zAxisMemberTwoLeftG: { type: Number, required: true },

  // Member 2 Right
  xAxisMemberTwoRightA: { type: Number, required: true },
  yAxisMemberTwoRightA: { type: Number, required: true },
  zAxisMemberTwoRightA: { type: Number, required: true },

  xAxisMemberTwoRightG: { type: Number, required: true },
  yAxisMemberTwoRightG: { type: Number, required: true },
  zAxisMemberTwoRightG: { type: Number, required: true },

  // EMG
  xAxisEMG: { type: Number, required: true },
  yAxisEMG: { type: Number, required: true },
  zAxisEMG: { type: Number, required: true },

  time: { type: String, required: true },
  danceMove: { type: String, required: true },
  position: [{ type: Number, required: true }],
})

module.exports = mongoose.model('Data', DataSchema)
