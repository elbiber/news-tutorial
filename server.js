const expressHandlebars = require('express-handlebars')
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const router = require('./routes')


const redisOptions = {
    url: process.env.REDIS_URL
}


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
server.use(bodyParser.json())

server.use(express.static('public'))

server.use(
    session({
        store: process.env.NODE_ENV === 'local' ? null : new RedisStore(redisOptions),
        secret: process.env.SESSION_SECRET || 'Pleas_SET_session_SeCreT',
        resave: false,
        saveUninitialized: true
    })
)

server.use((req, res, next) => {
    res.locals.isLoggedIn = req.session && req.session.isLoggedIn
    res.locals.user = req.session && req.session.user
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
