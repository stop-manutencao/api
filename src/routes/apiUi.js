/**
 * Dependencies
 */
import express from 'express'
const router = express.Router()
const path = require('path')

/********
 * ROUTES
 ********/


/**
 * Render index page
 */
router.get('/', (req, res) => res.render('/public/index'))


/**
 * Send raw yaml to ReDoc
 */

router.get('/api-doc.yaml', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.sendFile(
        path.join(
            path.dirname(path.dirname(__dirname)),
            '/api-doc.yaml'
        )
    )
})

/**
 * Render api ReDoc
 */

router.get('/docs', (req, res) => {
        res.sendFile(
            path.join(
                path.dirname(path.dirname(__dirname)),
                '/public/redoc.html')
            )
    });


/**
 * Export route to the server
 */

export default router
