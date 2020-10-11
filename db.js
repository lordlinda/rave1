const mongoose = require('mongoose')



const connection = mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/rave1', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('connected to mongodb...'))
    .catch(err => console.log('just a little issue', err))

module.exports = connection