const express = require('express')
const handlebars = require('express-handlebars')
const usersRouter = require('./routes/api/users.router.js');


const viewRouters = require('./routes/view.router.js')
const usersRouters = require('./routes/api/users.router.js')
const { connectDB } = require('./config/index.js')

const app = express()
const PORT = process.env.PORT || 8080

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname+'/public'))

app.engine('hbs', handlebars.engine({
    extname: '.hbs'
}))
app.set('views',__dirname+'/views')
app.set('view engine', 'hbs')

connectDB()

app.use('/', viewRouters)
app.use('/api/users', usersRouter)

app.listen(PORT, err =>{
    if (err) console.log('Error', err)
    console.log(`listener on port: ${PORT}`)
})