const express = require('express')
const bodyParser = require('body-parser')

const mongoose = require('../db/mongoose')
const {Todo} = require('../models/todo')
const User = require('../models/user')

const app = express()

app.use(bodyParser.json())

app.post('/todos', (req, res) => {
    const newTodo = new Todo({
        text: req.body.text
    })
    newTodo.save().then((result) => {
       res.send(result)
    }).catch((err) => {
       res.status(500).send(err)
    })
})
app.listen(3000, () => {
   console.log('Server is up on port 3000')
})

module.exports = {app}