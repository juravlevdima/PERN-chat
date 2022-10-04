import { Router } from 'express'
import { authenticate, login, registration, updateProfile } from '../controllers/userControllers'
import uploader from '../services/multer'

const router: Router = Router()

router.post('/registration', registration)
router.post('/login', login)
router.get('/authenticate', authenticate)
router.put('/update-profile', uploader.single('avatar'), updateProfile)

export default router
