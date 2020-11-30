import knex from 'knex'
import dotenv from 'dotenv'
import Knex from 'knex'

dotenv.config()

export abstract class BaseDatabase {
    private static connection: Knex | null = null
  
    protected static getConnection(): Knex {
        if(!BaseDatabase.connection){
            BaseDatabase.connection = knex({
                client: "mysql",
                connection:{
                    host: process.env.DB_HOST,
                    port: 3306,
                    user: process.env.DB_USER,
                    password: process.env.DB_PASSWORD,
                    database: process.env.DB_NAME,
                },
            });
        }


        return BaseDatabase.connection;
    }

    public static async destroyConnection(): Promise<void> {
        if(BaseDatabase.connection){
            await BaseDatabase.connection.destroy();
            BaseDatabase.connection = null;
        }
    }

    protected convertIntToBoolean(value: number): boolean{
        return value === 1;
    }
}

/*export const connection = knex({
    client: 'mysql',
    connection: {
       host: process.env.DB_HOST,
       user: process.env.DB_USER,
       password: process.env.DB_PASSWORD,
       database: process.env.DB_NAME,
       port: 3306
    }
})
*/