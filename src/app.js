/**
 * Dependencies
 */

import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import dotenv from 'dotenv'
import cors from 'cors'

/**
 * ROUTES
 */
import indexRouter from './routes/apiUi'
import statusRouter from './routes/status'
import gameRouter from './routes/game'

/**
 * GLOBAL PATHS
 */

global.__root_path = process.cwd()
global.__routes_path = `${__dirname}/routes`
global.__models_path = `${__dirname}/models`
global.__controllers_path = `${__dirname}/controllers`
global.__updates_path = `${__dirname}/updates`
global.__test_path = `${__dirname}/test`
global.__root_path = process.cwd()

/**
 * SERVER CONFIGURATION
 */

const app = express()
const cookieSecret = 'stopdacidadania'

dotenv.config()
app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser(cookieSecret))
app.use(express.static(path.join(__dirname, '../public')))

app.set('views', path.join(__dirname, '../public'))
app.set('view engine', 'ejs')
app.use('/coverage', express.static(path.join(__dirname, '../coverage/lcov-report')))

app.use('/', indexRouter)
app.use('/status', statusRouter)
app.use('/game', gameRouter)

/**
 * EXPORTING SERVER
 */

export default app
