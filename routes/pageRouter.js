import express from 'express'
import *as pageController from '../controller/pageController.js'
import *as authMiddeware from '../middlerwares/authMiddleware.js'

const router = express.Router()

router.route('/').get(authMiddeware.authenticateToken, pageController.getIndexPage)
router.route('/about').get(pageController.getAboutPage)
router.route('/register').get(pageController.getRegisterPage)
router.route('/login').get(pageController.getLoginPage)

export default router