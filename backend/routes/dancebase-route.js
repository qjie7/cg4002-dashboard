const express = require('express')

const router = express.Router()

const DUMMY_DATA = [{}]

router.get('/', (req, res, next) => {
  console.log('GET request')
  res.json({ message: 'it works' })
})

module.exports = router
