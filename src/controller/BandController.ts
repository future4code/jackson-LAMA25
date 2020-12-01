import { Request, Response } from "express";
import { bandBusiness, BandBusiness } from "../business/BandBusiness";
import { CustomError } from "../errors/CustomError";
import { InputBandDTO } from "../model/Band";

export class BandController {
    public async registerBand (req: Request, res: Response): Promise<void> {
        try {
            const token = req.headers.authorization as string

            const inputBand: InputBandDTO = {
                name: req.body.name,
                music_genre: req.body.music_genre,
                responsible: req.body.responsible
            }

            await bandBusiness.registerBand(
                token, 
                inputBand.name,
                inputBand.music_genre, 
                inputBand.responsible
            )

            res.status(200).send({
                message: "Band created successfully."
            })
            
        } catch (error) {
            res.status(error.statusCode).send(error.message || error.sqlMessage)
        }
    }
}