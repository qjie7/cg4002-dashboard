const express = require('express')
const passwordData = require('../models/password')
const ID = '60350e0fc4d3baa9bc8b89cc'

const validatePassword = async (req, res, next) => {
  //console.log(req.body)

  const passwordObj = await passwordData.find({})
  let passwordDB = passwordObj[0].password
  // console.log(typeof passwordDB)

  let password = parseInt(req.body.password)

  if (password === passwordDB) {
    res.json(true)
  } else {
    res.json(false)
  }

  // console.log(passwordDB)
  // console.log(password)

  // passwordData.findById(ID, async function (err, results) {
  //   const result = await
  //   console.log(results[0].toObject())
  // })

  //console.log(password)
  // res.status(201).json({ password: password })
}

exports.validatePassword = validatePassword
