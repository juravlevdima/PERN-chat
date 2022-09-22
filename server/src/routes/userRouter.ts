import { Router } from 'express'
import { authenticate, login, registration } from '../controllers/userControllers'
import MessageModel from '../models/MessageModel'
import RoomModel from '../models/RoomModel'
import UserModel from '../models/UserModel'

const router: Router = Router()

router.post('/registration', registration)
router.post('/login', login)
router.get('/authenticate', authenticate)


// !!!
router.post('/add-post', async (req, res) => {
  await MessageModel.create({...req.body})
  const messages = await MessageModel.findAll({
    attributes: ['id', 'text', 'createdAt'],
    include: [
      {model: RoomModel, as: 'room'},
      {model: UserModel, as: 'user', attributes: ['name']}
    ]
  })
  res.json(messages)
})

export default router
