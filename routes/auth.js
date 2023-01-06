import express from "express"
import { getUser, login,register, deleteUser,  updateUser} from "../controllers/auth.js"
const router = express.Router()

router.get('/', getUser)
router.post('/login', login)
router.post('/register', register)
router.delete('/users/:id',deleteUser)
router.put('/users/:id', updateUser)

export default router