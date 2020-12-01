import * as bcrypt from 'bcryptjs';

export class HashManager {

    rounds: number = Number(process.env.BCRYPT_COST)

    async hash(text: string): Promise<string> {
        const salt = await bcrypt.genSalt(this.rounds)
        return await bcrypt.hash(text, salt);
    }

    async compare(text: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(text, hash)
    }

}

export const hashManager = new HashManager()