import express from 'express'
import cors from 'cors'
import passport from 'passport'
import mongoose from 'mongoose'
import session from 'express-session'
import http from 'http'
import { Server } from 'socket.io'
import auth from  './src/routes/auth'
import api from './src/routes/api'
import config from './src/config'
import logger, { httpLogger } from './src/logger'
import registerMessageHandlers, { serverMessage } from './src/chat'

mongoose.connect(config.db)
mongoose.connection
  .on('connected', () => logger.info("MongoDB connected at " + config.db))
  .on('error', (err) => logger.error('MongoDB error. Make sure DB is running and URI is correct: ' + err))
  .on('disconnect', () => logger.info('MongoDB connection lost'));

const app = express()

const server = new http.Server(app)
const io = new Server(server, {
  cors: {
    origin: [
      'http://localhost:3000', 
      'http://localhost:3001',
      'http://localhost:3002',
      'http://localhost:49155'
    ]
  }
})

app.use(httpLogger)
app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }))
app.use(passport.initialize())
app.use(passport.session())

app.use('/', auth)
app.use('/api', api)
if (process.env.NODE_ENV === 'production') {
  console.log("hiiiii")
  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/web/index.html')
  })
}

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