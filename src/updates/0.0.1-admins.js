/**
 * This script automatically creates a default Admin user when an
 * empty database is used for the first time. You can use this
 * technique to insert data into any List you have defined.
 *
 * Alternatively, you can export a custom function for the update:
 * module.exports = function(done) { ... }
 */

const passwordAges = process.env.KEYSTONE_PASSWORD_AGES || 'ages123'
const passwordMobis = process.env.KEYSTONE_PASSWORD_MOBIS || 'mobis123'

exports.create = {
  Administrator: [
    {
      'name.first': 'AGES',
      'email': 'ages@pucrs.br',
      'password': passwordAges
    },
    {
      'name.first': 'Mobis',
      'email': 'contato@mobis.org.br',
      'password': passwordMobis
    }
  ]
}
