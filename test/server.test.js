const expect = require('expect')
const request = require('supertest')
const {Todo} = require('../models/todo')

const {app} = require('../server/server')

describe('POST /todos', () => {
    it('should add a new todo', (done) => {
        const text = 'Testing todos post'
        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text)
            })
            .end((err, res) => {
                if (err) return done(err)

                Todo.find().then((todos) => {
                    // expect(todos.length).toBe(1)
                    expect(todos[todos.length - 1].text).toBe(text)
                    done()
                }).catch((e) => done(e))
            })
    })

    it('should not create a Todo without body', (done) => {
        var oldLength, newLength
        Todo.find().then((todos) => {
            oldLength = todos.length
        })

        request(app)
            .post('/todos')
            .send({})
            .expect(500)
            .end(done)
    });
})