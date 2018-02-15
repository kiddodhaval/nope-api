const {MongoClient, ObjectID} = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) return console.log('Unable to connect to mongoDB')

    // db.collection('Todos').find({
    //     completed: false
    // }).toArray().then((docs) => {
    //    console.log(JSON.stringify(docs, undefined, 2))
    // })

    db.collection('Users').find({
        location: 'Mumbai'
    }).count().then((count) => {
       console.log(count)
    })

    db.close()
})