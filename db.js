const mongoose = require('mongoose')



const connection = mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('connected to mongodb...'))
    .catch(err => console.log('just a little issue'))

module.exports = connection