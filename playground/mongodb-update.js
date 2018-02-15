const {MongoClient, ObjectID} = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) return console.log('Unable to connect to mongodb')

    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('5a8596b7677988fbc21e6088')
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }).then((result) => {
    //     console.log(result)
    // })

    db.collection('Users').findOneAndUpdate({
        name: 'Behnaaa'
    },{
        $set: {
            name: 'Ria'
        },
        $inc: {
            age: 2
        }
    }).then((result) => {
       console.log(result)
    })
    db.close()
})