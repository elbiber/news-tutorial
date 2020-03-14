const expressHandlebars = require('express-handlebars')
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const router = require('./routes')

require('dotenv').config()

const server = express()

server.set('viewDir', 'views')

const logUrlMiddleware = (req, res, next) => {
    console.log(req.url)
    next()
}

server.use(logUrlMiddleware)
server.use(bodyParser.urlencoded({
    extended: true
}))

server.use(express.static('public'))

server.use(session({
    secret: process.env.SESSION_SECRET || 'Pleas_SET_session_SeCreT',
    resave: false,
    saveUninitialized: true
}))

server.use((req, res, next) => {
    res.locals.isLoggedIn = req.session && req.session.isLoggedIn
    next()
})

server.engine('html', expressHandlebars({
    extname: 'html',
    partialsDir: 'views/partials'
}))

server.set('view engine', 'html')

server.use('/', router)

server.listen(process.env.PORT, () => {
    console.log(`Server now listening at port ${process.env.PORT}`)
})
