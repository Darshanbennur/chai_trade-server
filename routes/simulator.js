const express = require('express');
const router = express.Router();
const {
    BuyTheStock,
    SellTheStock,
    getAlltheBoughtStocks,
    getAllTradesWithDatesAndPnL,
    getAllTradedStocks,
    getTradedStocksInBetweenDates
} = require('../controllers/simulatorController.js');

/**
 * @swagger
 * tags:
 *   name: Simulator
 *   description: API endpoints for stock simulation and trading
 */

router.post('/buyStock', BuyTheStock);

router.post('/sellStock', SellTheStock);

/**
 * @swagger
 * /api/simulator/getAllBoughtStocks:
 *   post:
 *     summary: Get all stocks bought by a user
 *     tags: [Simulator]
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
 *         description: Successfully retrieved all bought stocks
 *       '404':
 *         description: User array instance not found
 *       '500':
 *         description: Internal server error
 */
router.post('/getAllBoughtStocks', getAlltheBoughtStocks);

/**
 * @swagger
 * /api/simulator/getAllTradesWithDatesAndPnL:
 *   post:
 *     summary: Get all trades with dates and Profit/Loss
 *     tags: [Simulator]
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
 *         description: Successfully retrieved all trades with dates and PnL
 *       '404':
 *         description: User array instance not found
 *       '500':
 *         description: Internal server error
 */
router.post('/getAllTradesWithDatesAndPnL', getAllTradesWithDatesAndPnL);


/**
 * @swagger
 * /api/simulator/getAllTradedStocks:
 *   post:
 *     summary: Get all traded stock names
 *     tags: [Simulator]
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
 *         description: Successfully retrieved all traded stock names
 *       '404':
 *         description: User array instance not found
 *       '500':
 *         description: Internal server error
 */
router.post('/getAllTradedStocks', getAllTradedStocks);


/**
 * @swagger
 * /api/simulator/getTradedStocksBetweenTheDates:
 *   post:
 *     summary: Get traded stocks between given dates
 *     tags: [Simulator]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               arrayID:
 *                 type: string
 *               fromDate:
 *                 type: string
 *                 format: date
 *               toDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       '200':
 *         description: Successfully retrieved traded stocks between the dates
 *       '404':
 *         description: User array instance not found
 *       '500':
 *         description: Internal server error
 */
router.post('/getTradedStocksBetweenTheDates', getTradedStocksInBetweenDates);

router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = router;
