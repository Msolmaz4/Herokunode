import express from 'express'
import *as photoController from '../controller/photoController.js'
const router = express.Router()

router.route('/').post(photoController.createPhoto)
router.route('/').get(photoController.getAllPhotos)


router.route('/:id').get(photoController.getAPhotos)

router.route('/:id').delete(photoController.deletePhoto)
router.route('/:id').put(photoController.updatePhoto)



export default router