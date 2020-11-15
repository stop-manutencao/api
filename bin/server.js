#!/usr/bin/env node

/**
 * Module dependencies.
 */

import app from '../src/app'
import keystone from 'keystone'
import userController from '../src/controllers/user/user'
import gameController from '../src/controllers/game/game'

/**
 * Get port from environment.
 */

const port = normalizePort(process.env.PORT || '3000')
app.set('port', port)

/**
 * Mongo connection
 */

const mongoUrl = process.env.MONGO_URI || 'mongodb://localhost/stopdb'

/**
 * Keystone configs
 */

const models = 'src/models'
const updates = 'src/updates'
const favicon = `${global.__root_path}/public/images/favicon.jpg`

/**
 * Create Keystone server.
 */

keystone.init({
  'name': 'Stop da Cidadania',
  'brand': 'Stop da Cidadania',
  'favicon': favicon,
  'session': false,
  'port': port,
  'mongo': mongoUrl,
  'updates': updates,
  'auth': true,
  'module root': global.__root_path,
  'user model': 'Administrator',
  'auto update': true,
  'cookie secret': 'stopdacidadania'
})

keystone.import(models)
keystone.set('routes', app)

keystone.set('nav', {
  'Usuários': 'User',
  'Jogos': 'Game',
  'Categorias': ['Category', 'Alternative'],
  'Admin': 'Administrator'
})

/**
 * RUN SERVER AND START SOCKET
 */

keystone.start({
  onStart: () => {
    const server = keystone.httpsServer ? keystone.httpsServer : keystone.httpServer
    const io = require('socket.io')(server)

    io.on('connection', socket => {

      socket.on('getGame', async function(data) {
        socket.join(data.gameId)
        let users = await userController.getUsersSocket(data.gameId)
        if (users.status === 'FINISHED') {
          socket.emit('gameChanged', { status: users.status })
        } else {
          socket.in(data.gameId).emit('users', users)
          socket.emit('users', users)
        }
      })

      socket.on('changeGameStatus', async function(data) {
        let statusChanged = await gameController.changeStatusSocket(data.gameId, data.status)
        if (statusChanged) {
          let retorno = {
            gameId: data.gameId,
            status: data.status
          }
          socket.in(data.gameId).emit('gameChanged', retorno)
          socket.emit('gameChanged', retorno)
        }
      })

      socket.on('exit', async function(data) {
        await userController.removeInGame(data.playerId)
        let users = await userController.getUsersSocket(data.gameId)
        if (data.isOwner) {
          socket.in(data.gameId).emit('ownerExit')
        } else {
          socket.in(data.gameId).emit('playerLeft', users)
        }
      })
    })
  }
})

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}
