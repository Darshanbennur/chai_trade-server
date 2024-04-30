const express = require('express');
const { userRegister, userLogin, verifyCookie, logoutUser, makeChanges, getUserDetails } = require('../controllers/userController.js');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: API endpoints for managing user accounts
 */

router.post('/checkCookie', verifyCookie);


router.get('/logout', logoutUser);



router.post('/registerUser', userRegister);


/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Login user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User logged in successfully
 *       '401':
 *         description: Invalid user credentials
 */
router.post('/login', userLogin);

/**
 * @swagger
 * /api/user/makeChanges:
 *   post:
 *     summary: Make changes to user profile
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User profile updated successfully
 *       '403':
 *         description: Error updating user profile
 */
router.post('/makeChanges', makeChanges);



/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     summary: Get user details by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       '200':
 *         description: User details retrieved successfully
 *       '404':
 *         description: User not found
 */
router.get('/:id', getUserDetails);


//GET id Routes : 

router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = router;
