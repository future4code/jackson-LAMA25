import { CustomError } from "../errors/CustomError";
import { BaseDatabase } from "./BaseDatabase";

export class BandDatabase extends BaseDatabase {
    private static tableName: string = "lama_bands"

    public async registerBand(
        id: string,
        name: string,
        music_genre: string,
        responsible: string
    ) {
        try {
            await BaseDatabase.getConnection()
            .insert({id, name, music_genre, responsible})
            .into(BandDatabase.tableName)

        } catch (error) {

            if(error.message.includes("Duplicate entry")){
                throw new CustomError(409, "Band already registered.")
            }

            throw new CustomError(400, error.message || error.sqlMessage)
        }
    }

}

export const bandDatabase: BandDatabase = new BandDatabase()