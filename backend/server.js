// const express = require('express')
// const bodyParser = require('body-parser')
// const os = require('os-utils')
// const server = require('http').createServer()
// const io = require('socket.io')(server, {
//   transports: ['websocket', 'polling'],
// })

// const dummyData = require('./data/dummySensor.json')

// const app = express()

// // listen to connections from frontend

// io.on('connection', (socket) => {
//   if (socket.connected) {
//     console.log('Socket Connected!')
//   }

//   // socket.on('disconnect', function (reason) {
//   //   if (reason === "io server disconnect") {
//   //     // the disconnection was initiated by the server, you need to reconnect manually
//   //     socket.connect();
//   //   }
//   //   console.log('disconnected')
//   // })

//   // Emitting events to the frontend
//   setInterval(() => {
//     socket.emit('p1LeftA', getRandomData(dummyData, 1))

//     socket.emit('p1LeftG', getRandomData(dummyData))

//     socket.emit('p1RightA', getRandomData(dummyData))

//     socket.emit('p1RightG', getRandomData(dummyData))

//     socket.emit('p2LeftA', getRandomData(dummyData, 2))

//     socket.emit('p2LeftG', getRandomData(dummyData))

//     socket.emit('p2RightA', getRandomData(dummyData))

//     socket.emit('p2RightG', getRandomData(dummyData))

//     socket.emit('p3LeftA', getRandomData(dummyData, 3))

//     socket.emit('p3LeftG', getRandomData(dummyData))

//     socket.emit('p3RightA', getRandomData(dummyData))

//     socket.emit('p3RightG', getRandomData(dummyData))

//     socket.emit('player1', getRandomData(dummyData, 1))
//     socket.emit('player2', getRandomData(dummyData, 2))
//     socket.emit('player3', getRandomData(dummyData, 3))
//   }, 1000)
// })

// // app.use(danceBaseRoutes)
// // app.use('/developer', developerRoutes)

// // app.use((error, req, res, next) => {
// //   if (res.headerSent) {
// //     return next(error)
// //   }
// //   res.status(error.code || 500)
// //   res.json({ message: error.message || 'An unknown error occurred!' })
// // })

// //start our web server and socket.io server listening
// server.listen(3000, function () {
//   console.log('listening to requests from localhost:3000')
// })

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

const DummyData = require('./models/dummy_data')

const DummySensorData = require('./data/dummySensor.json')
const testLogData = require('./data/test_log.json')
const { getRandomData, getTestLogData } = require('./data_generator')

const port = 3000
const connection = mongoose.connection

//Connecting to socket.io
io.on('connection', (socket) => {
  console.log('socket.io: Client connected: ', socket.id)

  socket.on('disconnect', () => {
    console.log('socket.io: Client disconnected: ', socket.id)
  })

  // Emitting events to the frontend
  setInterval(() => {
    socket.emit('test_log', getTestLogData(testLogData))
  }, 10000)

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
setInterval(() => {
  let data = new DummyData({
    xAxis: getRandomData(DummySensorData).xAxis,
    yAxis: getRandomData(DummySensorData).yAxis,
    zAxis: getRandomData(DummySensorData).zAxis,
    danceMove: getRandomData(DummySensorData).danceMove,
    position: getRandomData(DummySensorData).position,
  })

  data.save((err) => {
    if (err) {
      console.log(err)
    } else {
      console.log(
        `A new dummy data has been saved to Database: ${DummyData.db.name} | Collection:${DummyData.collection.collectionName}`
      )
    }
  })
}, 5000)

connection.once('open', () => {
  console.log('MongoDB database connected')

  console.log('Setting change streams')
  const dummyChangeStream = connection.collection('dummydatas').watch()

  dummyChangeStream.on('change', (change) => {
    switch (change.operationType) {
      case 'insert':
        const data = {
          _id: change.fullDocument._id,
          xAxis: change.fullDocument.xAxis,
          yAxis: change.fullDocument.yAxis,
          zAxis: change.fullDocument.zAxis,
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
})

// //schedule deletion of dummydatas at midnight
// cron.schedule('0 0 0 * * *', async () => {
//   await connection.collection('dummydatas').drop()
// })

connection.on('error', (error) => console.log('Error: ' + error))
