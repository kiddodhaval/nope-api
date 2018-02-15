const MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to Mongodb')
    }

    console.log('connected successfully to Mongodb')

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Could not insert that document')
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2))
    // })

    // db.collection('Users').insertOne({
    //     name: 'Deepa',
    //     age: 32,
    //     location: 'Mumbai'
    // }, (err, result) => {
    //    if(err) return console.log('Unable to insert that document')
    //     console.log(JSON.stringify(result.ops, undefined, 2))
    // })
    //
    db.close()
})