import { Router } from 'express'
import { authenticate, login, registration } from '../controllers/userControllers'

const router: Router = Router()

router.get('/registration', registration)
router.get('/login', login)
router.get('/authenticate', authenticate)

export default router
