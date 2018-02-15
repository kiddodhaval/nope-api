const {MongoClient, ObjectID} = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
   if(err) return console.log('Unable to connect to mongodb')

    // db.collection('Todos').deleteMany({
    //     completed: true
    // }).then((result) => {
    //    console.log(result)
    // })

    // db.collection('Todos').deleteOne({
    //     text: 'learn node'
    // }).then((result) => {
    //    console.log(result)
    // })
    // db.close()

    db.collection('Todos').findOneAndDelete({
        completed: true
    }).then((result) => {
       console.log(result)
    })
})