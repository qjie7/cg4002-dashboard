const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
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

const port = 3000
const connection = mongoose.connection

//Connecting to socket.io
io.on('connection', (socket) => {
  console.log('socket.io: Client connected: ', socket.id)

  socket.on('disconnect', () => {
    console.log('socket.io: Client disconnected: ', socket.id)
  })
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

          // EMG
          EMG: change.fullDocument.EMG,

          time: change.fullDocument.time,

          danceMove: change.fullDocument.danceMove,
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

          time: change.fullDocument.time,

          danceMove: change.fullDocument.danceMove,
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

          time: change.fullDocument.time,

          danceMove: change.fullDocument.danceMove,
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

          finalDanceMove: change.fullDocument.finalDanceMove,
          finalPosition: change.fullDocument.finalPosition,

          finalSync: change.fullDocument.finalSync,
        }

        io.emit('new_data4', data4)
        break
    }
  })
})
console.log(dataSchema)
connection.on('error', (error) => console.log('Error: ' + error))
