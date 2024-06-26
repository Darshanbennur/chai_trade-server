const express = require('express')
const { getAllNews, getAllNewsWithoutCache } = require('../controllers/newsController.js')
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: News
 *   description: API endpoints for News Articles
 */


/**
 * @swagger
 * /api/news/getAllNews:
 *   get:
 *     summary: Get all news
 *     tags: [News] 
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

router.get('/getAllNewsWithoutCache', getAllNewsWithoutCache)

router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = router