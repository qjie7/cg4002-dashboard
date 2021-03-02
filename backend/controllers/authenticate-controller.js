const express = require('express')
const passwordData = require('../models/password')
const ID = '60350e0fc4d3baa9bc8b89cc'

const validatePassword = async (req, res, next) => {
  const passwordObj = await passwordData.find({})
  let passwordDB = passwordObj[0].password

  let password = parseInt(req.body.password)

  if (password === passwordDB) {
    res.json(true)
  } else {
    res.json(false)
  }
}

exports.validatePassword = validatePassword
