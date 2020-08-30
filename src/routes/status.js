import statusController from '../controllers/status/status'
import express from 'express'
const router = express.Router()

/**
 * Return service status
 */
router.get('/:test?', statusController.get)

export default router
