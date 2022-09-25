import { Router } from 'express'
import { authenticate, login, registration } from '../controllers/userControllers'

const router: Router = Router()

router.post('/registration', registration)
router.post('/login', login)
router.get('/authenticate', authenticate)

export default router
