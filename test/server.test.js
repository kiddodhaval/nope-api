const expect = require('expect')
const request = require('supertest')
const {Todo} = require('../models/todo')
const {ObjectID} = require('mongodb')

const {app} = require('../server/server')

const todos = [
    {
        _id: new ObjectID(),
        text: 'First test todo'
    }, {
        _id: new ObjectID(),
        text: 'Second test todo'
    }
];

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos)
    }).then(() => done())
})

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
                    expect(todos.length).toBe(3)
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
            .expect(400)
            .end(done)
    });
})

describe('GET /todos', () => {
    it('should return all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.length).toBe(2)
            })
            .end(done)
    });
})

describe('GET /todos/:id', () => {
    it('should return the todo which has the same id as passed', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id}`)
            .expect(200)
            .expect((res) => {
               expect(res.body.text).toBe(todos[0].text)
            })
            .end(done)
    });

    it('should return 404 if id does not match with any todo in db', (done) => {
        const newId = new ObjectID().toHexString()
        request(app)
            .get(`/todos/${newId }`)
            .expect(404)
            .end(done)
    });

    it('should return 404 if invalid ID provided', (done) => {
        request(app)
            .get('/todos/123abc')
            .expect(404)
            .end(done)
    });
})