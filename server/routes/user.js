import express from "express"
import { registerUser, loginUser } from "../controllers/UserController.js"

export const userRouter = express.Router()

userRouter.post('/login', loginUser)
userRouter.post('/register', registerUser)

