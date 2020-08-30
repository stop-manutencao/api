/**
 * Dependencies
 */
const keystone = require('keystone')
const Types = keystone.Field.Types

/**
 * ALTERNATIVE MODEL
 * =================
 */

 
/**
 * Model configuration
 */

const Alternative = new keystone.List('Alternative', {
  path: 'alternative',
  singular: 'Alternative',
  plural: 'Alternatives',
  map: {
    name: 'description'
  },
  sortable: false,
  track: true,
  searchFields: 'description'
})

/**
 * Model fileds
 */

Alternative.add({
  description: {
    label: 'Descrição',
    type: String,
    initial: true
  },
  isCorrect: {
    label: 'Está correta',
    type: Boolean,
    initial: true
  },
  category: {
    label: 'Categoria',
    type: Types.Relationship,
    ref: 'Category'
  },
  user: {
    type: Types.Relationship,
    ref: 'User',
    initial: false,
    hidden: true
  }
})

/**
 * Relationship declaration
 */

Alternative.relationship({
  path: 'category',
  ref: 'Category',
  refPath: 'alternative'
})

/**
 * Registration
 */

Alternative.defaultSort = '-createdAt'
Alternative.defaultColumns = 'description, category, isCorrect'

Alternative.register()
