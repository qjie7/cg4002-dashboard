const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const DummyData = require('./models/dummy_data')
const app = express()

app.use(bodyParser.json())

// function getRandomData(json, player) {
//   const keys = Object.keys(json)

//   const randIndex = Math.floor(Math.random() * keys.length)

//   const randKey = keys[randIndex]

//   return {
//     time: new Date().toLocaleTimeString(),
//     xAxis: json[randKey].X,
//     yAxis: json[randKey].Y,
//     zAxis: json[randKey].Z,
//     danceMove: getDanceMove(),
//     position: getPosition(json[randKey].X, player),
//   }
// }

// const dummy = DummyData.find({})
// console.log(dummy)

mongoose
  .connect(
    'mongodb+srv://qianjie:19930927QJ@cluster0.6fcdx.mongodb.net/dummy?retryWrites=true&w=majority'
  )
  .then(() => {
    app.listen(3000, function () {
      console.log('listening to requests from localhost:3000')
    })
  })
  .catch((err) => {
    console.log(err)
  })
