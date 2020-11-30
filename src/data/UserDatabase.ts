import { User } from "../model/User";
import { BaseDatabase } from "./BaseDatabase";

class UserDatabase extends BaseDatabase {
    private static tableName: string = "lama_users"

    public async signup(
        id: string,
        name: string,
        email: string,
        password: string,
        role: string
    ) {
        try {

            await super.getConnection()
            .insert({id, name, email, password, role})
            .into(UserDatabase.tableName)

            return "Sucess"

        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    public getByEmail = async (email: string): Promise<any | string> => {
        try {
            
            const result = await this.getConnection()
            .select("*")
            .from("lama_users")
            .where("email", email)

            return User.toUserModel(result[0])

        } catch (error) {
            let errorMessage = error.sqlMessage || error.message 
            
            if(errorMessage.includes("undefined")){
                errorMessage = "Invalid email."
            }

            throw new Error(errorMessage)
        }
        
    }
}

export const userDatabase = new UserDatabase()