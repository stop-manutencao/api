/**
 * Dependencies
 */
const keystone = require('keystone')
const Types = keystone.Field.Types


/**
 * USER MODEL
 * ==========
 */


/**
 * Model configuration
 */

const User = new keystone.List('User', {
  path: 'user',
  singular: 'User',
  plural: 'Users',
  nodelete: false,
  map: {
    name: 'id'
  },
  sortable: false,
  track: true,
  searchFields: 'email, nickname'
})

User.add({
  email: {
    label: 'Email',
    type: String,
    required: true,
    initial: true
  },
  nickname: {
    label: 'Apelido',
    type: String,
    required: true,
    initial: true
  },
  type: {
    label: 'Tipo',
    type: Types.Select,
    options: ['Player', 'Owner'],
    required: true,
    initial: true,
    noedit: true
  },
  score: {
    label: 'Pontuação',
    type: Types.Number,
    required: false,
    initial: false,
    default: 0,
    noedit: true
  },
  game: {
    label: 'Jogo',
    type: Types.Relationship,
    ref: 'Game',
    many: false,
    noedit: true
  },
  alternative: {
    label: 'Alternativa',
    type: Types.Relationship,
    ref: 'Alternative',
    many: true
  }
})


/**
 * Relstionship declaration
 */

User.relationship({
  path: 'alternative',
  ref: 'Alternative',
  refPath: 'user'
})


/**
 * Registration
 */

User.defaultSort = '-createdAt'
User.defaultColumns = 'nickname, email, score, type'
User.register()
