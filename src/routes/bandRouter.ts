import express from 'express'
import { BandController } from '../controller/BandController'

export const bandRouter = express.Router()
export const bandController = new BandController()

bandRouter.post("/register", bandController.registerBand)
