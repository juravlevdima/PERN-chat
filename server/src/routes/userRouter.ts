import { Router } from 'express'
import { authenticate, login, registration, updateProfile } from '../controllers/userControllers'
import uploader from '../services/multer'
import authMiddleware from '../middleware/authMiddleware'

const router: Router = Router()

router.post('/registration', registration)
router.post('/login', login)
router.get('/authenticate', authenticate)
router.put('/update-profile', authMiddleware(), uploader.single('avatar'), updateProfile)

export default router
