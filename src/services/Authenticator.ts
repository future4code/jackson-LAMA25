import * as jwt from 'jsonwebtoken'
import { USER_ROLES } from '../model/User';

export class Authenticator {
    private expireIn: string = process.env.TOKEN_EXPIRES_IN as string
    private jwt_key: string = process.env.JWT_KEY as string

    public generateToken(input: AuthenticationData){
        const token: string = jwt.sign({
                id: input.id,
                role: input.role
            },
                this.jwt_key, 
            {
                expiresIn: this.expireIn
            }
        );

        return token;
    }

    public getData(token: string): AuthenticationData {
        const payload = jwt.verify(token, this.jwt_key as string) as any
        const result = {
            id: payload.id,
            role: payload.role
        };

        return result;
    }


}

interface AuthenticationData {
    id: string,
    role?: string
}

export const authenticator: Authenticator = new Authenticator()