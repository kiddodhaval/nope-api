const express = require('express')
const bodyParser = require('body-parser')
const {ObjectID} = require('mongodb')

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
       res.status(400).send(err)
    })
})

app.get('/todos', (req, res) => {
   Todo.find().then((todos) => {
      res.send(todos)
   }).catch((err) => {
      res.status(400).send(err)
   })
})

app.get('/todos/:id', (req, res) => {
   const id = req.params.id
    if(!ObjectID.isValid(id)) return res.status(404).send('Invalid ID')

    Todo.findById(id).then((todo) => {
        if(!todo) return res.status(404).send('No Todo found')

       res.send(todo)
    }).catch((err) => {
       res.status(404).send(err)
    })
})

app.listen(3000, () => {
   console.log('Server is up on port 3000')
})

module.exports = {app}