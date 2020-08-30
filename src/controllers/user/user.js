/**
 * Dependencies
 */
import keystone from 'keystone'
import categoryController from '../category/category'


/***********************
 * ROUTE RELATED METHODS
 ***********************/


/**
 * Return all users by game
 */

async function getUsers(req, res) {
  const gameId = req.body.gameId

  if (!gameId) {
    return res.status(400)
      .send({
        success: false,
        message: 'Could not find a game with the specified value',
        hint: 'Check for body requirements related to the game'
      })
  }

  let players
  let game

  try {
    const User = keystone.list('User').model
    const Game = keystone.list('Game').model

    game = await Game
      .findOne({ 'gameId': gameId })

    players = await User
      .find({ 'game': game._id })

  } catch (err) {
    res.status(400)
      .send({
        success: false,
        message: 'Could not return users in the specified game id',
        error: err.toString,
        hint: 'Check for body requirements and associated values'
      })
  }

  return res.status(200)
    .send({
      success: true,
      players: players,
      status: game.status
    })
}


/**
 * Return all users by game per socket
 */

async function getUsersSocket(gameId) {
  if (!gameId) {
    return false
  }
  
  let players = []
  let game

  try {
    const User = keystone.list('User').model
    const Game = keystone.list('Game').model

    const actualGame = await Game.findOne({ 'gameId': gameId })

    players = await User
      .find({ game: actualGame._id })
      .exec()

    game = await Game
      .findOne({ gameId: gameId })
      .exec()
  } catch (e) { }

  return {
    players: players,
    status: game.status
  }
}


/**
 * Upsert a selected alternative for an user
 */

async function answerAlternative(req, res) {
  const User = keystone.list('User').model

  let user = await User.findById(req.body.userId)
  let change = await checkAlternativeCategory(user, req.body.alternativeId)

  user.alternative = change[0]
  user.score = change[1]

  user.save()

  res.status(200).send()
}


/****************************
 * PRIVATE CONTROLLER METHODS
 ****************************/


/**
 * Create a new user model instance through given data
 * (required fields) and its type ('Player' or 'Owner')
 */

function createUser(data, userType) {
  if (!data || !data.nickname || !data.email) return null

  const User = keystone.list('User').model

  const newUser = new User({
    email: data.email,
    nickname: data.nickname,
    type: userType
  })

  return newUser.save()
}


/**
 * Relate a user with a game through both ids (waits for the game creation)
 */

async function addUserInGame(userId, gameId) {
  const User = keystone.list('User').model

  const user = await User.findById(userId)
  user.game = gameId

  return user.save()
}


/**
 * Check when an update or insert is needed
 */

async function checkAlternativeCategory(user, alternativeId) {
  const alternatives = await categoryController
    .searchCategoryByAlternatives(alternativeId)

  let old = null
  let indexAlternative = -1

  alternatives
    .forEach(function (element) {
      let indexof = user.alternative.indexOf(element)

      if (indexof !== -1) {
        old = element
        indexAlternative = indexof
      }
    })

  if (indexAlternative === -1) {
    user.alternative.push(alternativeId)
  } else {
    user.alternative[indexAlternative] = alternativeId
  }

  return [user.alternative, await setScore(user, alternativeId, old)]
}


/**
 * Set the score of an user based on the chosen alternative
 */

async function setScore(user, newAlternativeId, oldAlternativeId) {
  const Alternative = keystone.list('Alternative').model
  const alternative = await Alternative.findById(newAlternativeId)

  let wasCorrect = false

  if (oldAlternativeId != null) {
    const oldAlternative = await Alternative.findById(oldAlternativeId)
    wasCorrect = oldAlternative.isCorrect
  }

  if (alternative.isCorrect) {
    if (!wasCorrect) {
      user.score = user.score + 1
    }
  } else {
    if (wasCorrect) {
      user.score = user.score - 1
    }
  }

  return user.score
}


/**
 * Export all functions to a router object
 */

export default {
  createUser,
  addUserInGame,
  getUsers,
  answerAlternative,
  getUsersSocket
}
