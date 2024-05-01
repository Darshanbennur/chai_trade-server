const express = require('express')
const router = express.Router();

const { getAllResources } = require('../controllers/EducationalResources.js')

/**
 * @swagger
 * tags:
 *   name: Educational Resources
 *   description: API endpoints for managing educational resources
 */

/**
 * @swagger
 * /api/educationalRoutes/getAllEducationalResources:
 *   get:
 *     summary: Get all educational resources
 *     tags: [Educational Resources]
 *     responses:
 *       '200':
 *         description: Retrieved educational resources successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                       content:
 *                         type: string
 *                       link:
 *                         type: string
 *       '403':
 *         description: Error in fetching educational resources
 */
router.get('/getAllEducationalResources', getAllResources);

// Schema definition for Educational Resources
const EducationalResources = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    content: { type: 'string' },
    link: { type: 'string' }
  },
  required: ['title', 'content', 'link']
};

module.exports = router;


//POST routes:

router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});


module.exports = router