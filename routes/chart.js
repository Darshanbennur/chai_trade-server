const express = require('express')
const { getAllCharts, updateCharts } = require('../controllers/chartController.js');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Charts
 *   description: API endpoints for managing charts
 */

/**
 * @swagger
 * /api/chart/getChartData:
 *   get:
 *     summary: Get all chart data
 *     tags: [Charts]
 *     responses:
 *       '200':
 *         description: A list of chart data categorized by type
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 companyStock:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Chart'
 *                 commodityStock:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Chart'
 *                 forexStock:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Chart'
 *                 cryptoStock:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Chart'
 *                 custom:
 *                   type: string
 *                   description: Success message
 */
router.get('/getChartData', getAllCharts);


/**
 * @swagger
 * /api/chart/updateCharts:
 *   get:
 *     summary: Update all chart data
 *     tags: [Charts]
 *     responses:
 *       '200':
 *         description: Success message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 */
router.get('/updateCharts', updateCharts);

router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = router