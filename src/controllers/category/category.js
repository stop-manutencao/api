/**
 * Dependencies
 */
import keystone from 'keystone'


/**
 * PRIVATE CONTROLLER METHODS
 */


 /**
  * Search a category though an alternative
  */

async function searchCategoryByAlternatives(alternativeId) {
  const Alternative = keystone.list('Alternative').model
  
  const alternatives = await Alternative.findById(alternativeId).populate('category')
  
  return alternatives.category.alternative
}


/**
 * Exporting to game controller
 */
export default {
  searchCategoryByAlternatives
}
