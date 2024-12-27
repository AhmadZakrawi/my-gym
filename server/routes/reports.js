import express from "express"
import { requireAuth } from "../middlewares/requireAuth.js"

export const reportsRouter = express.Router()



// this is fired before every request
reportsRouter.use(requireAuth)

