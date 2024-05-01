const express = require('express')
const { postBlog, getAllBlogs } = require('../controllers/blogController.js')
const router = express.Router();

//GET Routes : 

/**
 * @swagger
 * tags:
 *   name: Blog
 *   description: API endpoints for managing blog posts
 */

/**
 * @swagger
 * /api/blog/allBlogs:
 *   get:
 *     summary: Get all blog posts
 *     tags: [Blog]
 *     responses:
 *       '200':
 *         description: A list of blog posts
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
 *                       authorName:
 *                         type: string
 *                       title:
 *                         type: string
 *                       content:
 *                         type: string
 *                       authorAvatar:
 *                         type: string
 */
router.get('/allBlogs', getAllBlogs);

//POST Routes : 
/**
 * @swagger
 * /api/blog/postBlog:
 *   post:
 *     summary: Create a new blog post
 *     tags: [Blog]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               authorName:
 *                 type: string
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               authorAvatar:
 *                 type: string
 *             required:
 *               - authorName
 *               - title
 *               - content
 *               - authorAvatar
 *     responses:
 *       '200':
 *         description: Blog post created successfully
 *       '403':
 *         description: Failed to create blog post
 */
router.post('/postBlog', postBlog);


router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = router