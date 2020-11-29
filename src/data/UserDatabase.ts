import { User } from "../model/User";
import { BaseDatabase } from "./BaseDatabase";

class UserDatabase extends BaseDatabase {
    private tableName: string = "lama_users"

    public signup = async (
        id: string,
        name: string,
        email: string,
        password: string,
        role: string
    ) => {
        try {

            await super.getConnection()
            .insert({id, name, email, password, role})
            .into(this.tableName)

            return "Sucess"

        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    public getByEmail = async (email: string): Promise<any> => {
        try {
            
            const result = await super.getConnection()
            .select("*")
            .from(this.tableName)

            return result[0]

        } catch (error) {
            return (error.message || error.sqlMessage)
        }
        
    }
}

export const userDatabase = new UserDatabase()