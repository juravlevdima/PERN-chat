import { Router } from 'express'
import { authenticate, login, registration } from '../controllers/userControllers'
import verifyToken from '../middleware/verifyToken'

const router: Router = Router()

router.post('/registration', registration)
router.post('/login', login)
router.get('/authenticate', verifyToken, authenticate)

export default router
