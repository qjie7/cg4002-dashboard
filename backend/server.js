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

const DummySensorData = require('./data/dummySensor.json')
const testLogData = require('./data/test_log.json')
const { getRandomData, getTestLogData } = require('./data_generator')

const port = 3000
const connection = mongoose.connection

//Connecting to socket.io
io.on('connection', (socket) => {
  console.log('socket.io: Client connected: ', socket.id)

  // Emitting events to the frontend
  testInterval = setInterval(() => {
    socket.emit('test_log', getTestLogData(testLogData))
  }, 10000)

  socket.on('disconnect', () => {
    console.log('socket.io: Client disconnected: ', socket.id)
    // clearInterval(dbInterval)
    // clearInterval(testInterval)
  })
})

//start the server
server.listen(port, () => console.log(`Server now running on port ${port}!`))

//connect to db
mongoose.connect(
  'mongodb+srv://qianjie:19930927QJ@cluster0.6fcdx.mongodb.net/dummy?retryWrites=true&w=majority',
  // 'mongodb://localhost:dummy',
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
)

// mongoose.connect(config.mongoUri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
//   .then(client => {
//     const io = require('socket.io').listen(server);
//   const changeStream = Dancer.watch();
//   io.on('connection',function(socket){
//     console.log('Connection');
//     changeStream.on('change', change => {
//       console.log('COLLECTION CHANGED');
//       Dancer.find({},(err,data) => {
//         if (err) throw err;
//         if (data){
//           socket.emit('names',data);
//         }
//       })
//     });
//     socket.on('connection_test',data => {
//       console.log("New connection");
//     })
//     socket.on('disconnect',() => {
//       console.log("Disconnecting socket");
//     })
//   });
//   })
// mongoose.connection.on('error', () => {
//   throw new Error(`unable to connect to database: ${config.mongoUri}`)
// })

// Simulating the transfer of data into database
// and update in real time of any changes to the database
// const dbInterval = setInterval(() => {
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

//     time: getRandomData(DummySensorData).time,
//     danceMove: getRandomData(DummySensorData).danceMove,
//     position: getRandomData(DummySensorData).position,
//     accuracy: getRandomData(DummySensorData).accuracy,
//     sync: getRandomData(DummySensorData).sync,
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
// }, 1000)

connection.once('open', () => {
  console.log('MongoDB database connected')

  console.log('Setting change streams')

  // Leader
  const dataChangeStream = connection.collection('datas').watch()

  // Member 1
  const data2ChangeStream = connection.collection('datas2').watch()

  // Member 2
  const data3ChangeStream = connection.collection('datas3').watch()

  // Evaluation server
  const data4ChangeStream = connection.collection('datas4').watch()

  dataChangeStream.on('change', (change) => {
    switch (change.operationType) {
      case 'insert':
        const data = {
          _id: change.fullDocument._id,
          // Member 1 Left
          // xAxisMemberOneLeftA: change.fullDocument.xAxisMemberOneLeftA,
          // yAxisMemberOneLeftA: change.fullDocument.yAxisMemberOneLeftA,
          // zAxisMemberOneLeftA: change.fullDocument.zAxisMemberOneLeftA,

          // xAxisMemberOneLeftG: change.fullDocument.xAxisMemberOneLeftG,
          // yAxisMemberOneLeftG: change.fullDocument.yAxisMemberOneLeftG,
          // zAxisMemberOneLeftG: change.fullDocument.zAxisMemberOneLeftG,

          // // Member 1 Right
          // xAxisMemberOneRightA: change.fullDocument.xAxisMemberOneRightA,
          // yAxisMemberOneRightA: change.fullDocument.yAxisMemberOneRightA,
          // zAxisMemberOneRightA: change.fullDocument.zAxisMemberOneRightA,

          // xAxisMemberOneRightG: change.fullDocument.xAxisMemberOneRightG,
          // yAxisMemberOneRightG: change.fullDocument.yAxisMemberOneRightG,
          // zAxisMemberOneRightG: change.fullDocument.zAxisMemberOneRightG,

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
          // xAxisMemberTwoLeftA: change.fullDocument.xAxisMemberTwoLeftA,
          // yAxisMemberTwoLeftA: change.fullDocument.yAxisMemberTwoLeftA,
          // zAxisMemberTwoLeftA: change.fullDocument.zAxisMemberTwoLeftA,

          // xAxisMemberTwoLeftG: change.fullDocument.xAxisMemberTwoLeftG,
          // yAxisMemberTwoLeftG: change.fullDocument.yAxisMemberTwoLeftG,
          // zAxisMemberTwoLeftG: change.fullDocument.zAxisMemberTwoLeftG,

          // // Member 2 Right
          // xAxisMemberTwoRightA: change.fullDocument.xAxisMemberTwoRightA,
          // yAxisMemberTwoRightA: change.fullDocument.yAxisMemberTwoRightA,
          // zAxisMemberTwoRightA: change.fullDocument.zAxisMemberTwoRightA,

          // xAxisMemberTwoRightG: change.fullDocument.xAxisMemberTwoRightG,
          // yAxisMemberTwoRightG: change.fullDocument.yAxisMemberTwoRightG,
          // zAxisMemberTwoRightG: change.fullDocument.zAxisMemberTwoRightG,

          // EMG
          EMG: change.fullDocument.EMG,
          // xAxisEMG: change.fullDocument.xAxisEMG,
          // yAxisEMG: change.fullDocument.yAxisEMG,
          // zAxisEMG: change.fullDocument.zAxisEMG,

          time: change.fullDocument.time,

          // danceMove: change.fullDocument.danceMove,
          // position: change.fullDocument.position,
          // // accuracy: change.fullDocument.accuracy,
          // sync: change.fullDocument.sync,
        }

        io.emit('new_data', data)
        break
    }
  })

  data2ChangeStream.on('change', (change) => {
    switch (change.operationType) {
      case 'insert':
        const data2 = {
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

          // // Leader Left
          // xAxisLeaderLeftA: change.fullDocument.xAxisLeaderLeftA,
          // yAxisLeaderLeftA: change.fullDocument.yAxisLeaderLeftA,
          // zAxisLeaderLeftA: change.fullDocument.zAxisLeaderLeftA,

          // xAxisLeaderLeftG: change.fullDocument.xAxisLeaderLeftG,
          // yAxisLeaderLeftG: change.fullDocument.yAxisLeaderLeftG,
          // zAxisLeaderLeftG: change.fullDocument.zAxisLeaderLeftG,

          // // Leader Right
          // xAxisLeaderRightA: change.fullDocument.xAxisLeaderRightA,
          // yAxisLeaderRightA: change.fullDocument.yAxisLeaderRightA,
          // zAxisLeaderRightA: change.fullDocument.zAxisLeaderRightA,

          // xAxisLeaderRightG: change.fullDocument.xAxisLeaderRightG,
          // yAxisLeaderRightG: change.fullDocument.yAxisLeaderRightG,
          // zAxisLeaderRightG: change.fullDocument.zAxisLeaderRightG,

          // Member 2 Left
          // xAxisMemberTwoLeftA: change.fullDocument.xAxisMemberTwoLeftA,
          // yAxisMemberTwoLeftA: change.fullDocument.yAxisMemberTwoLeftA,
          // zAxisMemberTwoLeftA: change.fullDocument.zAxisMemberTwoLeftA,

          // xAxisMemberTwoLeftG: change.fullDocument.xAxisMemberTwoLeftG,
          // yAxisMemberTwoLeftG: change.fullDocument.yAxisMemberTwoLeftG,
          // zAxisMemberTwoLeftG: change.fullDocument.zAxisMemberTwoLeftG,

          // // Member 2 Right
          // xAxisMemberTwoRightA: change.fullDocument.xAxisMemberTwoRightA,
          // yAxisMemberTwoRightA: change.fullDocument.yAxisMemberTwoRightA,
          // zAxisMemberTwoRightA: change.fullDocument.zAxisMemberTwoRightA,

          // xAxisMemberTwoRightG: change.fullDocument.xAxisMemberTwoRightG,
          // yAxisMemberTwoRightG: change.fullDocument.yAxisMemberTwoRightG,
          // zAxisMemberTwoRightG: change.fullDocument.zAxisMemberTwoRightG,

          // EMG
          // EMG: change.fullDocument.EMG,
          // xAxisEMG: change.fullDocument.xAxisEMG,
          // yAxisEMG: change.fullDocument.yAxisEMG,
          // zAxisEMG: change.fullDocument.zAxisEMG,

          time: change.fullDocument.time,

          // danceMove: change.fullDocument.danceMove,
          // //position: change.fullDocument.position,
          // // accuracy: change.fullDocument.accuracy,
          // sync: change.fullDocument.sync,
        }

        io.emit('new_data2', data2)
        break
    }
  })

  data3ChangeStream.on('change', (change) => {
    switch (change.operationType) {
      case 'insert':
        const data3 = {
          _id: change.fullDocument._id,
          // Member 1 Left
          // xAxisMemberOneLeftA: change.fullDocument.xAxisMemberOneLeftA,
          // yAxisMemberOneLeftA: change.fullDocument.yAxisMemberOneLeftA,
          // zAxisMemberOneLeftA: change.fullDocument.zAxisMemberOneLeftA,

          // xAxisMemberOneLeftG: change.fullDocument.xAxisMemberOneLeftG,
          // yAxisMemberOneLeftG: change.fullDocument.yAxisMemberOneLeftG,
          // zAxisMemberOneLeftG: change.fullDocument.zAxisMemberOneLeftG,

          // // Member 1 Right
          // xAxisMemberOneRightA: change.fullDocument.xAxisMemberOneRightA,
          // yAxisMemberOneRightA: change.fullDocument.yAxisMemberOneRightA,
          // zAxisMemberOneRightA: change.fullDocument.zAxisMemberOneRightA,

          // xAxisMemberOneRightG: change.fullDocument.xAxisMemberOneRightG,
          // yAxisMemberOneRightG: change.fullDocument.yAxisMemberOneRightG,
          // zAxisMemberOneRightG: change.fullDocument.zAxisMemberOneRightG,

          // // Leader Left
          // xAxisLeaderLeftA: change.fullDocument.xAxisLeaderLeftA,
          // yAxisLeaderLeftA: change.fullDocument.yAxisLeaderLeftA,
          // zAxisLeaderLeftA: change.fullDocument.zAxisLeaderLeftA,

          // xAxisLeaderLeftG: change.fullDocument.xAxisLeaderLeftG,
          // yAxisLeaderLeftG: change.fullDocument.yAxisLeaderLeftG,
          // zAxisLeaderLeftG: change.fullDocument.zAxisLeaderLeftG,

          // // Leader Right
          // xAxisLeaderRightA: change.fullDocument.xAxisLeaderRightA,
          // yAxisLeaderRightA: change.fullDocument.yAxisLeaderRightA,
          // zAxisLeaderRightA: change.fullDocument.zAxisLeaderRightA,

          // xAxisLeaderRightG: change.fullDocument.xAxisLeaderRightG,
          // yAxisLeaderRightG: change.fullDocument.yAxisLeaderRightG,
          // zAxisLeaderRightG: change.fullDocument.zAxisLeaderRightG,

          //Member 2 Left
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
          // EMG: change.fullDocument.EMG,
          // xAxisEMG: change.fullDocument.xAxisEMG,
          // yAxisEMG: change.fullDocument.yAxisEMG,
          // zAxisEMG: change.fullDocument.zAxisEMG,

          time: change.fullDocument.time,

          // danceMove: change.fullDocument.danceMove,
          // //position: change.fullDocument.position,
          // // accuracy: change.fullDocument.accuracy,
          // sync: change.fullDocument.sync,
        }

        io.emit('new_data3', data3)
        break
    }
  })

  data4ChangeStream.on('change', (change) => {
    switch (change.operationType) {
      case 'insert':
        const data4 = {
          _id: change.fullDocument._id,
          // Member 1 Left
          // xAxisMemberOneLeftA: change.fullDocument.xAxisMemberOneLeftA,
          // yAxisMemberOneLeftA: change.fullDocument.yAxisMemberOneLeftA,
          // zAxisMemberOneLeftA: change.fullDocument.zAxisMemberOneLeftA,

          // xAxisMemberOneLeftG: change.fullDocument.xAxisMemberOneLeftG,
          // yAxisMemberOneLeftG: change.fullDocument.yAxisMemberOneLeftG,
          // zAxisMemberOneLeftG: change.fullDocument.zAxisMemberOneLeftG,

          // // Member 1 Right
          // xAxisMemberOneRightA: change.fullDocument.xAxisMemberOneRightA,
          // yAxisMemberOneRightA: change.fullDocument.yAxisMemberOneRightA,
          // zAxisMemberOneRightA: change.fullDocument.zAxisMemberOneRightA,

          // xAxisMemberOneRightG: change.fullDocument.xAxisMemberOneRightG,
          // yAxisMemberOneRightG: change.fullDocument.yAxisMemberOneRightG,
          // zAxisMemberOneRightG: change.fullDocument.zAxisMemberOneRightG,

          // // Leader Left
          // xAxisLeaderLeftA: change.fullDocument.xAxisLeaderLeftA,
          // yAxisLeaderLeftA: change.fullDocument.yAxisLeaderLeftA,
          // zAxisLeaderLeftA: change.fullDocument.zAxisLeaderLeftA,

          // xAxisLeaderLeftG: change.fullDocument.xAxisLeaderLeftG,
          // yAxisLeaderLeftG: change.fullDocument.yAxisLeaderLeftG,
          // zAxisLeaderLeftG: change.fullDocument.zAxisLeaderLeftG,

          // // Leader Right
          // xAxisLeaderRightA: change.fullDocument.xAxisLeaderRightA,
          // yAxisLeaderRightA: change.fullDocument.yAxisLeaderRightA,
          // zAxisLeaderRightA: change.fullDocument.zAxisLeaderRightA,

          // xAxisLeaderRightG: change.fullDocument.xAxisLeaderRightG,
          // yAxisLeaderRightG: change.fullDocument.yAxisLeaderRightG,
          // zAxisLeaderRightG: change.fullDocument.zAxisLeaderRightG,

          //Member 2 Left
          // xAxisMemberTwoLeftA: change.fullDocument.xAxisMemberTwoLeftA,
          // yAxisMemberTwoLeftA: change.fullDocument.yAxisMemberTwoLeftA,
          // zAxisMemberTwoLeftA: change.fullDocument.zAxisMemberTwoLeftA,

          // xAxisMemberTwoLeftG: change.fullDocument.xAxisMemberTwoLeftG,
          // yAxisMemberTwoLeftG: change.fullDocument.yAxisMemberTwoLeftG,
          // zAxisMemberTwoLeftG: change.fullDocument.zAxisMemberTwoLeftG,

          // // Member 2 Right
          // xAxisMemberTwoRightA: change.fullDocument.xAxisMemberTwoRightA,
          // yAxisMemberTwoRightA: change.fullDocument.yAxisMemberTwoRightA,
          // zAxisMemberTwoRightA: change.fullDocument.zAxisMemberTwoRightA,

          // xAxisMemberTwoRightG: change.fullDocument.xAxisMemberTwoRightG,
          // yAxisMemberTwoRightG: change.fullDocument.yAxisMemberTwoRightG,
          // zAxisMemberTwoRightG: change.fullDocument.zAxisMemberTwoRightG,

          // EMG
          // EMG: change.fullDocument.EMG,
          // xAxisEMG: change.fullDocument.xAxisEMG,
          // yAxisEMG: change.fullDocument.yAxisEMG,
          // zAxisEMG: change.fullDocument.zAxisEMG,

          // time: change.fullDocument.time,

          finalDanceMove: change.fullDocument.finalDanceMove,
          finalPosition: change.fullDocument.finalPosition,
          // accuracy: change.fullDocument.accuracy,
          finalSync: change.fullDocument.finalSync,
        }

        io.emit('new_data4', data4)
        break
    }
  })
})

// //schedule deletion of datas at midnight
// cron.schedule('0 0 0 * * *', async () => {
//   await connection.collection('dummydatas').drop()
// })

connection.on('error', (error) => console.log('Error: ' + error))
