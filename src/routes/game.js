/**
 * Dependencies
 */
import gameController from '../controllers/game/game'
import userController from '../controllers/user/user'
import express from 'express'
const router = express.Router()


/********
 * ROUTES
 ********/


/**
 * Get all users from game
 */
router.post('/users', userController.getUsers)


/**
 * Catch an user's score
 */
router.get('/score/:gameId', gameController.getScore)


/**
 * Create a new game
 */
router.post('/create', gameController.create)


/**
 * Sign in a game
 */
router.post('/signin', gameController.signIn)


/**
 * Changes the game status
 */
router.post('/status', gameController.changeStatus)


/**
 * Upsert alternative in user model
 */
router.post('/answer', userController.answerAlternative)


/**
 * Exporting router to the server
 */
export default router
