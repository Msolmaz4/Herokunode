import express from 'express'
import *as pageController from '../controller/pageController.js'
//burda tokeni olusturuo deneme icin taptik
//sonra cookieparder indirip ordan devam ettik
//import *as authMiddeware from '../middlerwares/authMiddleware.js'
//router.route('/').get(authMiddeware.authenticateToken, pageController.getIndexPage)
const router = express.Router()

router.route('/').get(pageController.getIndexPage)
router.route('/about').get(pageController.getAboutPage)
router.route('/register').get(pageController.getRegisterPage)
router.route('/login').get(pageController.getLoginPage)
router.route('/logout').get(pageController.getLogout)
router.route('/contact').get(pageController.getContactPage)
router.route('/contact').post(pageController.sendMail)

export default router