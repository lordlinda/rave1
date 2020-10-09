const mongoose = require('mongoose')



const connection = mongoose.connect(process.env.MONGO_URL || 'mongodb+srv://lord:phaneroo@5@cluster0.o6d7u.mongodb.net/rave1?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('connected to mongodb...'))
    .catch(err => console.log('just a little issue'))

module.exports = connection