import express from 'express'
import { loginUser, adminLogin, RegisUser } from '../controllers/userController.js'

const userRoute = express.Router()

userRoute.post('/register', RegisUser)
userRoute.post('/login', loginUser)
userRoute.post('/admin', adminLogin)

export default userRoute