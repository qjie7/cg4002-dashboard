const express = require('express')

const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {
  transports: ['websocket', 'polling'],
})

const testLogData = require('./data/test_log.json')
const { getTestLogData } = require('./data_generator')

//Connecting to socket.io
io.on('connection', (socket) => {
  console.log('socket.io: Client connected: ', socket.id)

  socket.on('disconnect', () => {
    console.log('socket.io: Client disconnected: ', socket.id)
  })

  // Emitting events to the frontend
  setInterval(() => {
    socket.emit('test_log', getTestLogData(testLogData))
  }, 1000)
})

//start the server
server.listen(port, () => console.log(`Server now running on port ${port}!`))
