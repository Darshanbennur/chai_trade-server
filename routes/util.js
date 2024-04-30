const express = require('express');
const router = express.Router();
const { getAllTransaction, increase20K, increase40K, makeUserPremium, postContactUs } = require('../controllers/pricingController.js');


/**
 * @swagger
 * tags:
 *   name: Pricing
 *   description: API endpoints for pricing and transactions
 */
/**
 * @swagger
 * /api/util/getAllTransaction:
 *   post:
 *     summary: Get all user transactions
 *     tags: [Pricing]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               arrayID:
 *                 type: string
 *     responses:
 *       '200':
 *         description: All user transactions retrieved successfully
 *       '404':
 *         description: Array user not found
 *       '500':
 *         description: Error fetching transactions
 */
router.post('/getAllTransaction', getAllTransaction);


router.post('/purchase20k', increase20K);

router.post('/purchase40k', increase40K);

router.post('/purchasePremium', makeUserPremium);

/**
 * @swagger
 * /api/util/postContactUs:
 *   post:
 *     summary: Post contact us message
 *     tags: [Pricing]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               authorName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *             required:
 *               - authorName
 *               - email
 *               - title
 *               - content
 *     responses:
 *       '200':
 *         description: Contact us message posted successfully
 *       '403':
 *         description: Error posting contact us message
 *       '500':
 *         description: Internal server error
 */
router.post('/postContactUs', postContactUs);

router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = router;
