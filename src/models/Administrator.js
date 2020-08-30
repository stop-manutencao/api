/**
 * Dependencies
 */
'use strict'
const keystone = require('keystone')
const Types = keystone.Field.Types


/**
 * ADMIN MODEL
 * ===========
 */


/**
 * Model configuration
 */

const Admin = new keystone.List('Administrator', {
  path: 'administrators',
  singular: 'Admin',
  plural: 'Admins',
  map: {
    name: 'email'
  },
  sortable: false,
  track: true
})


/**
 * Model fields
 */

Admin.add({
  name: {
    type: Types.Name,
    initial: true
  },
  email: {
    type: Types.Email,
    initial: true,
    required: true,
    index: true
  },
  password: {
    type: Types.Password,
    initial: true,
    required: true
  }
})


/**
 * Providing access to keystone (AdminUI)
 */

Admin.schema.virtual('canAccessKeystone')
  .get(() => {
    return true
  })


/**
 * Registration
 */

Admin.defaultColumns = 'email, name, isAdmin|10%, isEmailVerified|10%'
Admin.register()
