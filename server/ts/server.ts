import express from 'express'
import passport from 'passport'
import mongoose from 'mongoose'
import session from 'express-session'
import http from 'http'
import { Server } from 'socket.io'
import auth from  './routes/auth'
import api from './routes/api'
import config from './config'
import logger, { httpLogger } from './logger'
import registerMessageHandlers, { serverMessage } from './chat'

mongoose.connect(config.db, { })

const app = express()

const server = new http.Server(app)
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000']
  }
})

app.use(httpLogger)
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }))
app.use(passport.initialize())
app.use(passport.session())

app.use('/', auth)
app.use('/api', api)

io.on('connection', (socket) => {
  const username = socket.handshake.auth.username

  logger.info(`${username} connected.`)
  io.emit('message:create', serverMessage(`${username} connected.`))

  registerMessageHandlers(io, socket)

  socket.on('disconnect', () => {
    logger.info(`${username} has left.`)
    io.emit('message:create', serverMessage(`${username} has left.`))
  })
});

server.listen(config.port, () => {
  logger.info(`Server listening on *:${config.port}`)
})