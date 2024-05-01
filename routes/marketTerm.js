const express = require('express')
const { getAllFAQ } = require('../controllers/maketTermController.js')
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Market Term
 *   description: API endpoints for managing market terms and FAQs
 */

/**
 * @swagger
 * /api/marketTerm/getAllFAQ:
 *   get:
 *     summary: Get all FAQs
 *     tags: [Market Term]
 *     responses:
 *       '200':
 *         description: Retrieved FAQs successfully
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
 *                       question:
 *                         type: string
 *                       answer:
 *                         type: string
 *       '500':
 *         description: Internal server error
 */
router.get('/getAllFAQ', getAllFAQ);

// Schema definition for Market Term
const MarketTerm = {
  type: 'object',
  properties: {
    question: { type: 'string' },
    answer: { type: 'string' }
  },
  required: ['question', 'answer']
};

module.exports = router;
router.get('/getAllFAQ', getAllFAQ)

router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = router