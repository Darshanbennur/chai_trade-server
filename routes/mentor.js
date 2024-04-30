const express = require('express')
const { getAllFeaturedBlogs, LikeThisPost, postFeaturedSectionBlog,
    getAllMentorBlogs, postMentorApplication, getMentorBlogDatesAndLikes } = require('../controllers/mentorController')
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Mentor
 *   description: API endpoints for mentor-related operations
 */

/**
 * @swagger
 * /api/mentor/getAllFeaturedBlogs:
 *   get:
 *     summary: Get all featured blogs
 *     tags: [Mentor]
 *     responses:
 *       '200':
 *         description: Retrieved all featured blogs successfully
 *       '403':
 *         description: Error in fetching all featured blogs
 */
router.get("/getAllFeaturedBlogs", getAllFeaturedBlogs);

/**
 * @swagger
 * /api/mentor/postMentorBlog:
 *   post:
 *     summary: Post a mentor blog
 *     tags: [Mentor]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mentorID:
 *                 type: string
 *               mentorEmail:
 *                 type: string
 *                 format: email
 *               mentorName:
 *                 type: string
 *               mentorImage:
 *                 type: string
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               arrayID:
 *                 type: string
 *             required:
 *               - mentorID
 *               - mentorEmail
 *               - mentorName
 *               - mentorImage
 *               - title
 *               - content
 *               
 *     responses:
 *       '200':
 *         description: Blog posted by mentor successfully
 *       '403':
 *         description: Error posting blog by mentor
 */
router.post('/postMentorBlog', postFeaturedSectionBlog);

/**
 * @swagger
 * /api/mentor/getMentorBlogs:
 *   post:
 *     summary: Get all mentor blogs
 *     tags: [Mentor]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               arrayID:
 *                 type: string
 *             required:
 *               - arrayID
 *     responses:
 *       '200':
 *         description: Retrieved all mentor blogs successfully
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Error in fetching all mentor blogs
 */
router.post('/getMentorBlogs', getAllMentorBlogs);


router.post('/likePost', LikeThisPost);

/**
 * @swagger
 * /api/mentor/getMentorBlogDatesAndLikes:
 *   post:
 *     summary: Get dates and likes for mentor blogs
 *     tags: [Mentor]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               arrayID:
 *                 type: string
 *             required:
 *               - arrayID
 *     responses:
 *       '200':
 *         description: Retrieved blog dates and likes successfully
 *       '404':
 *         description: User array instance not found
 *       '500':
 *         description: Error in fetching blog dates and likes
 */
router.post('/getMentorBlogDatesAndLikes', getMentorBlogDatesAndLikes);

//POST Routes : for applying for a mentor as a user
// router.post('/postMentorApplication', postMentorApplication)

router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});


module.exports = router