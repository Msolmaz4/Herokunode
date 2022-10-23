import express from 'express'
import *as photoController from '../controller/photoController.js'
const router = express.Router()

router.route('/').post(photoController.createPhoto)



export default router