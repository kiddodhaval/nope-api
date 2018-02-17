const expect = require('expect')
const request = require('supertest')
const {Todo} = require('../models/todo')

const {app} = require('../server/server')

const todos = [
    {
        text: 'First test todo'
    }, {
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