import express from "express"
import { userRouter  } from "./routes/user.js"
import { manageRouter  } from "./routes/manage.js"
import { profileRouter  } from "./routes/profile.js"
import { tasksRouter  } from "./routes/dashboard.js"
import dotenv from "dotenv"
import cors from "cors"


dotenv.config()

const app = express()

app.use(express.json({ limit: '3mb' }));
app.use(cors({credentials: true, origin:"*"}))



app.use('/api/user', userRouter)
app.use('/api/manage', manageRouter)
app.use('/api/profile', profileRouter)
app.use('/api/dashboard', tasksRouter)

app.get('/', (req, res) => {
    res.send('Welcome to MyGym API')
  });


app.listen(process.env.PORT, () => console.log("Server listening on port " + process.env.PORT))