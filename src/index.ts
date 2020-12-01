import express, {Express} from 'express'
import cors from 'cors'
import { userRouter } from './routes/userRouter'
import { bandRouter } from './routes/bandRouter'

const app: Express = express()
app.use(express.json())
app.use(cors())

app.use("/user", userRouter)
app.use("/band", bandRouter)

app.listen(3003, () => {
    console.log("Servidor is running..")
})