import express, {Express} from 'express'
import cors from 'cors'
import { userRouter } from './routes/UserRouter'

const app: Express = express()
app.use(express.json())
app.use(cors())

app.use("user", userRouter)

app.listen(3003, () => {
    console.log("Servidor is running..")
})