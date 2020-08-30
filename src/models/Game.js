/**
 * Dependencies
 */
const keystone = require('keystone')
const Types = keystone.Field.Types

/**
 * GAME MODEL
 * ==========
 */


/**
 * Model configuration
 */

const Game = new keystone.List('Game', {
  path: 'games',
  singular: 'Game',
  plural: 'Games',
  map: {
    name: 'gameId'
  },
  sortable: false,
  track: true,
  searchFields: 'letter'
})


/**
 * Model fields
 */

Game.add({
  gameId: {
    label: 'Id do jogo',
    type: String,
    initial: true,
    noedit: true
  },
  status: {
    label: 'Status do jogo',
    type: Types.Select,
    options: ['OPEN', 'IN_PROGRESS', 'FINISHED'],
    required: true,
    noedit: true,
    initial: true
  },
  maxNumberCategories: {
    label: 'Número Máximo Colunas',
    type: Number,
    required: true,
    initial: true,
    noedit: true
  },
  maxNumberPlayers: {
    label: 'Número Máximo Jogadores',
    type: Number,
    required: true,
    initial: true
  },
  initTime: {
    label: 'Tempo de Início',
    type: Types.Datetime,
    noedit: true
  },
  endTime: {
    label: 'Tempo de Termino',
    type: Types.Datetime,
    noedit: true
  },
  date: {
    label: 'Data',
    type: Types.Datetime,
    required: true,
    initial: true,
    noedit: true
  },
  user: {
    label: 'Criador do jogo',
    type: Types.Relationship,
    ref: 'User',
    many: false,
    noedit: true
  },
  letter: {
    label: 'Letra',
    type: Types.Select,
    options: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    required: true,
    initial: true,
    noedit: true
  },
  time: {
    label: 'Jogar por tempo',
    type: Boolean,
    required: true,
    noedit: true
  },
  category: {
    type: Types.Relationship,
    ref: 'Category',
    many: true,
    noedit: true,
    hidden: true
  }
})


/**
 * Relationship declaration
 */

Game.relationship({
  path: 'user',
  ref: 'User',
  refPath: 'game'
})

Game.relationship({
  path: 'category',
  ref: 'Category',
  refPath: 'game'
})


/**
 * Registration
 */

Game.defaultSort = '-createdAt'
Game.defaultColumns = 'gameId, letter, status, date, time'
Game.register()
