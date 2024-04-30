const express = require('express')
const { getAllNews } = require('../controllers/newsController.js')
const router = express.Router();

/**
 * @swagger
 * /api/news/getAllNews:
 *   get:
 *     summary: Get all news
 *     description: Retrieves all news articles.
 *     responses:
 *       200:
 *         description: A list of news articles.
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
 *                       image:
 *                         type: string
 *                         description: The image URL of the news article.
 *                       title:
 *                         type: string
 *                         description: The title of the news article.
 *                       headlines:
 *                         type: string
 *                         description: The headlines of the news article.
 *                       url:
 *                         type: string
 *                         description: The URL of the news article.
 *                 custom:
 *                   type: string
 *                   description: Custom message indicating success.
 *       500:
 *         description: Internal server error.
 */
router.get('/getAllNews', getAllNews);

router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = router