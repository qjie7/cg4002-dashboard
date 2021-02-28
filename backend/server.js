const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cron = require('node-cron')
const HttpError = require('./models/HttpError')
const authenticateRoutes = require('./routes/authenticate-route')

const app = express()
app.use(bodyParser.json())

app.use('/api/login', authenticateRoutes)

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error)
  }
  res.status(error.code || 500)
  res.json({ message: error.message || 'An unknown error occurred!' })
})

const server = require('http').createServer(app)

const io = require('socket.io')(server, {
  transports: ['websocket', 'polling'],
})

const Data = require('./models/data')
// const DummyData = require('./models/dummy_data')
// const DummyData2 = require('./models/dummy_data2')
// const DummyData3 = require('./models/dummy_data3')

const DummySensorData = require('./data/dummySensor.json')
const testLogData = require('./data/test_log.json')
const { getRandomData, getTestLogData } = require('./data_generator')

const port = 3000
const connection = mongoose.connection

//Connecting to socket.io
io.on('connection', (socket) => {
  console.log('socket.io: Client connected: ', socket.id)

  // Simulating the transfer of data into database
  // and update in real time of any changes to the database
  // dbInterval = setInterval(() => {
  //   let data = new Data({
  //     // Member 1 Left
  //     xAxisMemberOneLeftA: getRandomData(DummySensorData).xAxis,
  //     yAxisMemberOneLeftA: getRandomData(DummySensorData).yAxis,
  //     zAxisMemberOneLeftA: getRandomData(DummySensorData).zAxis,
  //     xAxisMemberOneLeftG: getRandomData(DummySensorData).xAxis,
  //     yAxisMemberOneLeftG: getRandomData(DummySensorData).yAxis,
  //     zAxisMemberOneLeftG: getRandomData(DummySensorData).zAxis,
  //     // Member 1 Right
  //     xAxisMemberOneRightA: getRandomData(DummySensorData).xAxis,
  //     yAxisMemberOneRightA: getRandomData(DummySensorData).yAxis,
  //     zAxisMemberOneRightA: getRandomData(DummySensorData).zAxis,
  //     xAxisMemberOneRightG: getRandomData(DummySensorData).xAxis,
  //     yAxisMemberOneRightG: getRandomData(DummySensorData).yAxis,
  //     zAxisMemberOneRightG: getRandomData(DummySensorData).zAxis,
  //     // Leader Left
  //     xAxisLeaderLeftA: getRandomData(DummySensorData).xAxis,
  //     yAxisLeaderLeftA: getRandomData(DummySensorData).yAxis,
  //     zAxisLeaderLeftA: getRandomData(DummySensorData).zAxis,
  //     xAxisLeaderLeftG: getRandomData(DummySensorData).xAxis,
  //     yAxisLeaderLeftG: getRandomData(DummySensorData).yAxis,
  //     zAxisLeaderLeftG: getRandomData(DummySensorData).zAxis,
  //     // Leader Right
  //     xAxisLeaderRightA: getRandomData(DummySensorData).xAxis,
  //     yAxisLeaderRightA: getRandomData(DummySensorData).yAxis,
  //     zAxisLeaderRightA: getRandomData(DummySensorData).zAxis,
  //     xAxisLeaderRightG: getRandomData(DummySensorData).xAxis,
  //     yAxisLeaderRightG: getRandomData(DummySensorData).yAxis,
  //     zAxisLeaderRightG: getRandomData(DummySensorData).zAxis,
  //     // Member 2 Left
  //     xAxisMemberTwoLeftA: getRandomData(DummySensorData).xAxis,
  //     yAxisMemberTwoLeftA: getRandomData(DummySensorData).yAxis,
  //     zAxisMemberTwoLeftA: getRandomData(DummySensorData).zAxis,
  //     xAxisMemberTwoLeftG: getRandomData(DummySensorData).xAxis,
  //     yAxisMemberTwoLeftG: getRandomData(DummySensorData).yAxis,
  //     zAxisMemberTwoLeftG: getRandomData(DummySensorData).zAxis,
  //     // Member 2 Right
  //     xAxisMemberTwoRightA: getRandomData(DummySensorData).xAxis,
  //     yAxisMemberTwoRightA: getRandomData(DummySensorData).yAxis,
  //     zAxisMemberTwoRightA: getRandomData(DummySensorData).zAxis,
  //     xAxisMemberTwoRightG: getRandomData(DummySensorData).xAxis,
  //     yAxisMemberTwoRightG: getRandomData(DummySensorData).yAxis,
  //     zAxisMemberTwoRightG: getRandomData(DummySensorData).zAxis,
  //     // EMG
  //     xAxisEMG: getRandomData(DummySensorData).xAxis,
  //     yAxisEMG: getRandomData(DummySensorData).yAxis,
  //     zAxisEMG: getRandomData(DummySensorData).zAxis,
  //     // xAxis: getRandomData(DummySensorData).xAxis,
  //     // yAxis: getRandomData(DummySensorData).yAxis,
  //     // zAxis: getRandomData(DummySensorData).zAxis,
  //     time: getRandomData(DummySensorData).time,
  //     danceMove: getRandomData(DummySensorData).danceMove,
  //     position: getRandomData(DummySensorData).position,
  //   })
  //   data.save((err) => {
  //     if (err) {
  //       console.log(err)
  //     } else {
  //       console.log(
  //         `A new dummy data has been saved to Database: ${Data.db.name} | Collection:${Data.collection.collectionName}`
  //       )
  //     }
  //   })
  // }, 5000)

  // Emitting events to the frontend
  testInterval = setInterval(() => {
    socket.emit('test_log', getTestLogData(testLogData))
  }, 10000)

  socket.on('disconnect', () => {
    console.log('socket.io: Client disconnected: ', socket.id)
    clearInterval(dbInterval)
    // clearInterval(testInterval)
  })

  // app.post('/api/connection', (req, res, next) => {
  //   console.log(req.body.checked)
  //   if (req.body.checked) {
  //     socket.disconnect()
  //     console.log('disconnect')
  //   } else {
  //     if (!socket) {
  //       socket = io.connect('http://localhost:3000', { secure: false })
  //       socket.on('connect', function () {
  //         console.log('connected')
  //       })
  //       // socket.on('disconnect', function () {
  //       //   console.log('disconnected')
  //       // })
  //     } else {
  //       socket.socket.connect()
  //     }
  //     // socket.on('connection', (socket) => {
  //     //   console.log('reconnect')
  //     // })
  //   }
  // })

  // socket.on('video_click', (danceMove) => {
  //   //console.log(danceMove)
  //   switch (danceMove) {
  //     case 'elbowkick':
  //       // code block
  //       const filter = { name: 'elbowkick' }
  //       VideoCount.findOneAndUpdate(
  //         filter,
  //         { $inc: { count: 1 } },
  //         { new: true, upsert: true },
  //         function (err) {
  //           if (err) {
  //             console.log(err)
  //           } else {
  //             console.log('added elbowkick count')
  //           }
  //         }
  //       )

  //       break
  //     // default:
  //     // // code block
  //   }
  // })
})

//start the server
server.listen(port, () => console.log(`Server now running on port ${port}!`))

//connect to db
mongoose.connect(
  'mongodb+srv://qianjie:19930927QJ@cluster0.6fcdx.mongodb.net/dummy?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
)
// Simulating the transfer of data into database
// and update in real time of any changes to the database
const dbInterval = setInterval(() => {
  let data = new Data({
    // Member 1 Left
    xAxisMemberOneLeftA: getRandomData(DummySensorData).xAxis,
    yAxisMemberOneLeftA: getRandomData(DummySensorData).yAxis,
    zAxisMemberOneLeftA: getRandomData(DummySensorData).zAxis,

    xAxisMemberOneLeftG: getRandomData(DummySensorData).xAxis,
    yAxisMemberOneLeftG: getRandomData(DummySensorData).yAxis,
    zAxisMemberOneLeftG: getRandomData(DummySensorData).zAxis,

    // Member 1 Right
    xAxisMemberOneRightA: getRandomData(DummySensorData).xAxis,
    yAxisMemberOneRightA: getRandomData(DummySensorData).yAxis,
    zAxisMemberOneRightA: getRandomData(DummySensorData).zAxis,

    xAxisMemberOneRightG: getRandomData(DummySensorData).xAxis,
    yAxisMemberOneRightG: getRandomData(DummySensorData).yAxis,
    zAxisMemberOneRightG: getRandomData(DummySensorData).zAxis,

    // Leader Left
    xAxisLeaderLeftA: getRandomData(DummySensorData).xAxis,
    yAxisLeaderLeftA: getRandomData(DummySensorData).yAxis,
    zAxisLeaderLeftA: getRandomData(DummySensorData).zAxis,

    xAxisLeaderLeftG: getRandomData(DummySensorData).xAxis,
    yAxisLeaderLeftG: getRandomData(DummySensorData).yAxis,
    zAxisLeaderLeftG: getRandomData(DummySensorData).zAxis,

    // Leader Right
    xAxisLeaderRightA: getRandomData(DummySensorData).xAxis,
    yAxisLeaderRightA: getRandomData(DummySensorData).yAxis,
    zAxisLeaderRightA: getRandomData(DummySensorData).zAxis,

    xAxisLeaderRightG: getRandomData(DummySensorData).xAxis,
    yAxisLeaderRightG: getRandomData(DummySensorData).yAxis,
    zAxisLeaderRightG: getRandomData(DummySensorData).zAxis,

    // Member 2 Left
    xAxisMemberTwoLeftA: getRandomData(DummySensorData).xAxis,
    yAxisMemberTwoLeftA: getRandomData(DummySensorData).yAxis,
    zAxisMemberTwoLeftA: getRandomData(DummySensorData).zAxis,

    xAxisMemberTwoLeftG: getRandomData(DummySensorData).xAxis,
    yAxisMemberTwoLeftG: getRandomData(DummySensorData).yAxis,
    zAxisMemberTwoLeftG: getRandomData(DummySensorData).zAxis,

    // Member 2 Right
    xAxisMemberTwoRightA: getRandomData(DummySensorData).xAxis,
    yAxisMemberTwoRightA: getRandomData(DummySensorData).yAxis,
    zAxisMemberTwoRightA: getRandomData(DummySensorData).zAxis,

    xAxisMemberTwoRightG: getRandomData(DummySensorData).xAxis,
    yAxisMemberTwoRightG: getRandomData(DummySensorData).yAxis,
    zAxisMemberTwoRightG: getRandomData(DummySensorData).zAxis,

    // EMG
    xAxisEMG: getRandomData(DummySensorData).xAxis,
    yAxisEMG: getRandomData(DummySensorData).yAxis,
    zAxisEMG: getRandomData(DummySensorData).zAxis,
    // xAxis: getRandomData(DummySensorData).xAxis,
    // yAxis: getRandomData(DummySensorData).yAxis,
    // zAxis: getRandomData(DummySensorData).zAxis,
    time: getRandomData(DummySensorData).time,
    danceMove: getRandomData(DummySensorData).danceMove,
    position: getRandomData(DummySensorData).position,
  })

  data.save((err) => {
    if (err) {
      console.log(err)
    } else {
      console.log(
        `A new dummy data has been saved to Database: ${Data.db.name} | Collection:${Data.collection.collectionName}`
      )
    }
  })
}, 5000)

// // Simulating the transfer of data into database
// // and update in real time of any changes to the database
// let dbInterval = setInterval(() => {
//   let data = new DummyData({
//     xAxis: getRandomData(DummySensorData).xAxis,
//     yAxis: getRandomData(DummySensorData).yAxis,
//     zAxis: getRandomData(DummySensorData).zAxis,
//     danceMove: getRandomData(DummySensorData).danceMove,
//     position: getRandomData(DummySensorData).position,
//   })

//   let data2 = new DummyData2({
//     xAxis: getRandomData(DummySensorData).xAxis,
//     yAxis: getRandomData(DummySensorData).yAxis,
//     zAxis: getRandomData(DummySensorData).zAxis,
//     danceMove: getRandomData(DummySensorData).danceMove,
//     position: getRandomData(DummySensorData).position,
//   })

//   let data3 = new DummyData3({
//     xAxis: getRandomData(DummySensorData).xAxis,
//     yAxis: getRandomData(DummySensorData).yAxis,
//     zAxis: getRandomData(DummySensorData).zAxis,
//     danceMove: getRandomData(DummySensorData).danceMove,
//     position: getRandomData(DummySensorData).position,
//   })

//   data.save((err) => {
//     if (err) {
//       console.log(err)
//     } else {
//       console.log(
//         `A new dummy data has been saved to Database: ${DummyData.db.name} | Collection:${DummyData.collection.collectionName}`
//       )
//     }
//   })

//   data2.save((err) => {
//     if (err) {
//       console.log(err)
//     } else {
//       console.log(
//         `A new dummy data has been saved to Database: ${DummyData2.db.name} | Collection:${DummyData2.collection.collectionName}`
//       )
//     }
//   })

//   data3.save((err) => {
//     if (err) {
//       console.log(err)
//     } else {
//       console.log(
//         `A new dummy data has been saved to Database: ${DummyData3.db.name} | Collection:${DummyData3.collection.collectionName}`
//       )
//     }
//   })
// }, 5000)

connection.once('open', () => {
  console.log('MongoDB database connected')

  console.log('Setting change streams')

  const dataChangeStream = connection.collection('datas').watch()
  // const dummyChangeStream = connection.collection('dummydatas').watch()
  // const dummyChangeStream2 = connection.collection('dummydata2').watch()
  // const dummyChangeStream3 = connection.collection('dummydata3').watch()

  dataChangeStream.on('change', (change) => {
    switch (change.operationType) {
      case 'insert':
        const data = {
          _id: change.fullDocument._id,
          // Member 1 Left
          xAxisMemberOneLeftA: change.fullDocument.xAxisMemberOneLeftA,
          yAxisMemberOneLeftA: change.fullDocument.yAxisMemberOneLeftA,
          zAxisMemberOneLeftA: change.fullDocument.zAxisMemberOneLeftA,

          xAxisMemberOneLeftG: change.fullDocument.xAxisMemberOneLeftG,
          yAxisMemberOneLeftG: change.fullDocument.yAxisMemberOneLeftG,
          zAxisMemberOneLeftG: change.fullDocument.zAxisMemberOneLeftG,

          // Member 1 Right
          xAxisMemberOneRightA: change.fullDocument.xAxisMemberOneRightA,
          yAxisMemberOneRightA: change.fullDocument.yAxisMemberOneRightA,
          zAxisMemberOneRightA: change.fullDocument.zAxisMemberOneRightA,

          xAxisMemberOneRightG: change.fullDocument.xAxisMemberOneRightG,
          yAxisMemberOneRightG: change.fullDocument.yAxisMemberOneRightG,
          zAxisMemberOneRightG: change.fullDocument.zAxisMemberOneRightG,

          // Leader Left
          xAxisLeaderLeftA: change.fullDocument.xAxisLeaderLeftA,
          yAxisLeaderLeftA: change.fullDocument.yAxisLeaderLeftA,
          zAxisLeaderLeftA: change.fullDocument.zAxisLeaderLeftA,

          xAxisLeaderLeftG: change.fullDocument.xAxisLeaderLeftG,
          yAxisLeaderLeftG: change.fullDocument.yAxisLeaderLeftG,
          zAxisLeaderLeftG: change.fullDocument.zAxisLeaderLeftG,

          // Leader Right
          xAxisLeaderRightA: change.fullDocument.xAxisLeaderRightA,
          yAxisLeaderRightA: change.fullDocument.yAxisLeaderRightA,
          zAxisLeaderRightA: change.fullDocument.zAxisLeaderRightA,

          xAxisLeaderRightG: change.fullDocument.xAxisLeaderRightG,
          yAxisLeaderRightG: change.fullDocument.yAxisLeaderRightG,
          zAxisLeaderRightG: change.fullDocument.zAxisLeaderRightG,

          // Member 2 Left
          xAxisMemberTwoLeftA: change.fullDocument.xAxisMemberTwoLeftA,
          yAxisMemberTwoLeftA: change.fullDocument.yAxisMemberTwoLeftA,
          zAxisMemberTwoLeftA: change.fullDocument.zAxisMemberTwoLeftA,

          xAxisMemberTwoLeftG: change.fullDocument.xAxisMemberTwoLeftG,
          yAxisMemberTwoLeftG: change.fullDocument.yAxisMemberTwoLeftG,
          zAxisMemberTwoLeftG: change.fullDocument.zAxisMemberTwoLeftG,

          // Member 2 Right
          xAxisMemberTwoRightA: change.fullDocument.xAxisMemberTwoRightA,
          yAxisMemberTwoRightA: change.fullDocument.yAxisMemberTwoRightA,
          zAxisMemberTwoRightA: change.fullDocument.zAxisMemberTwoRightA,

          xAxisMemberTwoRightG: change.fullDocument.xAxisMemberTwoRightG,
          yAxisMemberTwoRightG: change.fullDocument.yAxisMemberTwoRightG,
          zAxisMemberTwoRightG: change.fullDocument.zAxisMemberTwoRightG,

          // EMG
          xAxisEMG: change.fullDocument.xAxisEMG,
          yAxisEMG: change.fullDocument.yAxisEMG,
          zAxisEMG: change.fullDocument.zAxisEMG,
          // xAxis: getRandomData(DummySensorData).xAxis,
          // yAxis: getRandomData(DummySensorData).yAxis,
          // zAxis: getRandomData(DummySensorData).zAxis,
          time: change.fullDocument.time,
          // xAxis: change.fullDocument.xAxis,
          // yAxis: change.fullDocument.yAxis,
          // zAxis: change.fullDocument.zAxis,
          danceMove: change.fullDocument.danceMove,
          position: change.fullDocument.position,
        }

        io.emit('new_data', data)
        break

      // case 'delete':
      //   io.of('/api/socket').emit('deletedThought', change.documentKey._id)
      //   break
    }
  })

  // dummyChangeStream.on('change', (change) => {
  //   switch (change.operationType) {
  //     case 'insert':
  //       const data = {
  //         _id: change.fullDocument._id,
  //         xAxis: change.fullDocument.xAxis,
  //         yAxis: change.fullDocument.yAxis,
  //         zAxis: change.fullDocument.zAxis,
  //         danceMove: change.fullDocument.danceMove,
  //         position: change.fullDocument.position,
  //       }

  //       io.emit('new_data', data)
  //       break

  //     // case 'delete':
  //     //   io.of('/api/socket').emit('deletedThought', change.documentKey._id)
  //     //   break
  //   }
  // })

  // dummyChangeStream2.on('change', (change) => {
  //   switch (change.operationType) {
  //     case 'insert':
  //       const data2 = {
  //         _id: change.fullDocument._id,
  //         xAxis: change.fullDocument.xAxis,
  //         yAxis: change.fullDocument.yAxis,
  //         zAxis: change.fullDocument.zAxis,
  //         danceMove: change.fullDocument.danceMove,
  //         position: change.fullDocument.position,
  //       }

  //       io.emit('new_data2', data2)
  //       break

  //     // case 'delete':
  //     //   io.of('/api/socket').emit('deletedThought', change.documentKey._id)
  //     //   break
  //   }
  // })

  // dummyChangeStream3.on('change', (change) => {
  //   switch (change.operationType) {
  //     case 'insert':
  //       const data3 = {
  //         _id: change.fullDocument._id,
  //         xAxis: change.fullDocument.xAxis,
  //         yAxis: change.fullDocument.yAxis,
  //         zAxis: change.fullDocument.zAxis,
  //         danceMove: change.fullDocument.danceMove,
  //         position: change.fullDocument.position,
  //       }

  //       io.emit('new_data3', data3)
  //       break

  //     // case 'delete':
  //     //   io.of('/api/socket').emit('deletedThought', change.documentKey._id)
  //     //   break
  //   }
  // })
})

// //schedule deletion of dummydatas at midnight
// cron.schedule('0 0 0 * * *', async () => {
//   await connection.collection('dummydatas').drop()
// })

connection.on('error', (error) => console.log('Error: ' + error))
