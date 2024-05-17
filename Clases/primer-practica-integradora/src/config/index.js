const { connect } = require('mongoose')

exports.connectDB = () => {
    connect('mongodb://127.0.0.1:27017/c53145')
    console.log('Base de datos conectada')
}
