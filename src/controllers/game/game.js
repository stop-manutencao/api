/**
 * Dependencies
 */
import keystone from 'keystone'
import userController from '../user/user'
import _ from 'underscore'
import { connection } from 'mongoose';
import { exec } from 'child_process';


/***********************
 * ROUTE RELATED METHODS
 ***********************/


/**
 * Create a game model instance (waits for owner creation)
 */

async function create(req, res) {

  let maxNumberCategories = req.body.maxNumberCategories

  try {
    if ( parseInt(maxNumberCategories) < 4) {
      maxNumberCategories = 4
    }
  } catch (err) {
    res.status(400)
      .send({
        success: false,
        message: 'Invalid number of categories',
        hint: 'Check for body requirements related to the game',
        error: err
      })
  }

  try {
    if ( parseInt(req.body.maxNumberPlayers) <= 0) {
      res.status(400)
      .send({
        success: false,
        message: 'Invalid number of players',
        hint: 'Check for body requirements related to the game',
        error: err
      })
    }
  } catch (err) {
    res.status(400)
      .send({
        success: false,
        message: 'Invalid number of players',
        hint: 'Check for body requirements related to the game',
        error: err
      })
  }

  const user = await userController.createUser(req.body, 'Owner')

  if (!user) {
    return res.status(400)
      .send({
        success: false,
        message: 'Could not create user',
        hint: 'Invalid body, check for requirements'
      })
  }

  const Game = keystone.list('Game').model

  const letters = await searchLetters()
  const letter = letters[_.random(0, (letters.length) - 1)]
  const categories = await searchCategories(letter._id, parseInt(req.body.maxNumberCategories))
  const id = await createGameId(Game)
  const date = Date.now()
  const status = 'OPEN'

  const newGame = new Game({
    gameId: id,
    date: date,
    letter: letter,
    user: user._id,
    maxNumberCategories: req.body.maxNumberCategories,
    maxNumberPlayers: req.body.maxNumberPlayers,
    status: status,
    time: req.body.time,
    category: categories
  })

  newGame.save()
    .then(async game => {

      await userController.addUserInGame(user._id, game._id)

      await addCategoryInGame(categories, game._id)

      game.category = categories

      res.status(201).send(game)
    })
}


/**
 * Sign in an existing game
 */

async function signIn(req, res) {

  const Game = keystone.list('Game').model
  const Category = keystone.list('Category').model

  Game.findOne()
    .where('gameId', req.body.gameId)
    .then(async game => {

      const User = keystone.list('User').model
      let players = await User
        .find({ game: game._id })

      if(game.maxNumberPlayers <= players.length ){
        //lenght of players exceded the limit of match
        return res.status(400).send({
          success: false,
          message: 'The room is full',
          hint:'The room is full'
        })
      }

      let user = await userController.createUser(req.body, 'Player')

      if (!user) {
        return res.status(400)
          .send({
            success: false,
            message: 'Could not create user',
            hint: 'Invalid body values, check for requirements related to user'
          })
      }

      await userController.addUserInGame(user._id, game._id)

      game.category = await Category
        .find({game: game})
        .populate('alternative')
      game.user = user._id
      res.status(200).send(game)
    })
    .catch(err => res.status(400)
      .send({
        success: false,
        message: 'Game does not exist',
        hint:'Invalid body values, check for requirements related to game'
      })
    )
};



/**
 * Changes the game status fot listener purposes
 */

async function changeStatus(req, res) {
  const gameId = req.body.gameId

  if (!gameId) {
    return res.status(400)
      .send({
        success: false,
        message: 'Could not change game status',
        hint: 'Missing body values, check for requirements related to the game'
      })
  }
  const Game = keystone.list('Game').model

  try {
    const game = await Game.findOne({'gameId': gameId})

    if (game.status === 'OPEN') {
      game.status = 'IN_PROGRESS'
    } else {
      game.status = 'FINISHED'
    }
    
    await game.save()

    res.status(200)
      .send({status: game.status})
  } catch (err) {
    res.status(400)
      .send({
        success: false,
        message: 'Could not change game status',
        error: err.message,
        hint: 'Invalid body values, check for requirements'
      })
  }
}

/**
 * Change the game status by socket
 */

async function changeStatusSocket(gameId, status) {
  if (!gameId && (status !== 'IN_PROGRESS' || status !== 'FINISHED')) {
    return false
  }
  const Game = keystone.list('Game').model

  try {
    const game = await Game.findOne({'gameId': gameId})
    game.status = status
    game.save()
    return true
  } catch (err) {
    console.log("error: "+err)
    return false
  }
}



/**
 * Get the score for every user
 */

async function getScore(req, res) {
  const User = keystone.list('User').model
  const Game = keystone.list('Game').model

  try {
    const actualGame = await Game.findOne({ 'gameId': req.params.gameId })

    const rawUsers = await User
      .find()
      .where('game', actualGame._id)
      .sort('-score')

    const parsedUsers = []

    rawUsers.forEach(user => {
      parsedUsers.push({
        nickname: user.nickname,
        score: user.score
      })
    })

    res.status(200)
      .send(parsedUsers)
  } catch (err) {
    res.status(400)
      .send({
        success : false,
        message: 'Could not get the user score',
        error: err.message,
        hint: 'Missing or invalid body values, check for requirements related to user'
    })
  }
}


/****************************
 * PRIVATE CONTROLLER METHODS
 ****************************/

/**
 * Generates a new gameId
 */

async function createGameId(Game) {
  const latest = await Game
    .find()
    .sort('-createdAt')
    .limit(1)

  let newId = '10000'

  if (latest.length != 0) {
    newId = String(parseInt(latest[0].gameId)+1)
  }

  return newId;
}


/**
 * Add a category in an existing game
 */

async function addCategoryInGame(categories, gameId) {
  const Category = keystone.list('Category').model

  categories.forEach(async element => {
    const category = await Category.findById(element._id)

    category.game = gameId

    category.save()
  })
}


/**
 * Search for valid categories and add them in game respecting the limit input
 */

async function searchCategories(letter, maxNumberCategories) {
  const Category = keystone.list('Category').model 

  const selectedCategories = shuffleCategories(
    await Category.find({'letter': letter, 'isDisabled': {$ne: true}}, '_id'),
    maxNumberCategories
  )

  const categories = []

  for(let element of selectedCategories){
    categories.push(await Category
      .findById(element['_id'])
      .populate('alternative')
    )
  }

  return categories
}


/**
 * Shuffles a list of selected categories over a letter for a game
 */

function shuffleCategories(selectedCategories, maxNumberCategories) {
  try{

    const ans = _.shuffle(selectedCategories)

    if (maxNumberCategories < selectedCategories.length){
      return ans
    }
    return ans.slice(0, maxNumberCategories)
  }
  catch(err) {
    console.log(err)
  }
}

/**
 * Search for valid letters to sort in a game
 */

async function searchLetters() {
  const Category = keystone.list('Category').model
  return Category
    .aggregate([{
      $group: {
        '_id': '$letter',
        total: {$sum: 1}
      }
    }])
}


/**
 * Export all functions to a router object
 */

export default {
  create,
  signIn,
  changeStatus,
  getScore,
  changeStatusSocket
}
