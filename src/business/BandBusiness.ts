import { bandDatabase } from "../data/BandDatabase";
import { CustomError } from "../errors/CustomError";
import { authenticator } from "../services/Authenticator";
import { idGenerator } from "../services/IdGenerator";

export class BandBusiness {

    public async registerBand(
        token: string,
        name: string,
        music_genre: string,
        responsible: string
    ) {
        try {
            if(!token){
                throw new CustomError(401, "Unauthorized user.")
            }

            if(
                !name ||
                !music_genre ||
                !responsible
            ) {
                throw new CustomError(409, "Fill in all fields.")
            }

            const tokenData = authenticator.getData(token)

            if(!tokenData || tokenData.role === "NORMAL"){
                throw new CustomError(401, "Unauthorized user.")
            }

            const id: string = idGenerator.generate()

            const result = await bandDatabase.registerBand(id, name, music_genre, responsible)

            console.log(result)

            if(result === undefined) {
                throw new CustomError(400, "bad request")
            }

        } catch (error) {
          throw new CustomError(error.statusCode, error.message || error.sqlMessage)
        }
    }
}

export const bandBusiness: BandBusiness = new BandBusiness()