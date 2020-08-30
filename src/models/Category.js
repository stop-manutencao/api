/**
 * Depepndencies
 */
const keystone = require('keystone')
const Types = keystone.Field.Types

/**
 * CATEGORY MODEL
 * ==============
 */


/**
 * Model configuration
 */

const Category = new keystone.List('Category', {
  path: 'category',
  singular: 'Category',
  plural: 'Categories',
  map: {
    name: 'displayName'
  },
  sortable: false,
  track: true,
  searchFields: 'name'
})


/**
 * Model fields
 */

Category.add({
  name: {
    label: 'Nome',
    type: String,
    required: true,
    initial: true
  },
  letter: {
    label: 'Letra',
    type: String,
    required: true,
    initial: true
  },
  alternative: {
    label: 'Alternativa',
    type: Types.Relationship,
    ref: 'Alternative',
    many: true
  },
  game: {
    type: Types.Relationship,
    ref: 'Game',
    noedit: true,
    many: true,
    hidden: true
  },
  isDisabled: {
    label: 'Desabilitar',
    type: Boolean,
  }
})


/**
 * Model name visualization
 */
Category.schema.virtual('displayName').get(function() {
  return this.name + ' - ' + this.letter
})


/**
 * Relashionship declaration
 */

Category.relationship({
  path: 'alternative',
  ref: 'Alternative',
  refPath: 'category'
})


/**
 * Registration
 */

Category.defaultSort = '-createdAt'
Category.defaultColumns = 'name, letter'
Category.register()
