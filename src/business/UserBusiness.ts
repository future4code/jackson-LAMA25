import { userDatabase } from "../data/UserDatabase";
import { CustomError } from "../errors/CustomError";
import { User, UserBusinessSignUpOutputDTO, UserModel } from "../model/User";
import { authenticator } from "../services/Authenticator";
import { hashManager } from "../services/HashManager";
import { idGenerator} from "../services/IdGenerator";

class UserBusiness {

    public signup = async (
        name: string, 
        email: string, 
        password: string, 
        role: string
        ): Promise<UserBusinessSignUpOutputDTO> => {
            
        try {            
                       
            if(
                !name ||
                !email ||
                !password ||
                !role
            ) {
                throw new CustomError(400, "Preencha todos os campos.")
            };

            if(!email.includes("@")) {
                throw new Error("E-mail inválido.")
            };

            if(password.length < 6) {
                throw new Error("A senha deve ser maior que 6 caracteres.")
            };

            const id: string = idGenerator.generate();

            const hashPassword: string = await hashManager.hash(password);

            const user: User = new User(id, name, email, hashPassword, role); // o erro do user roles deve cair aqui!

            await userDatabase.signup(
                user.getId(), 
                user.getName(),
                user.getEmail(),
                hashPassword,
                user.getRole()
            );

            const token: string = authenticator.generateToken({
                id: user.getId(), 
                role: user.getRole()
            });

            return ({
                id: user.getId(),
                token: token
            });

        } catch (error) {
            console.log(error.message)

            if(error.message.includes("Duplicate entry")){
                throw new CustomError(409, "Usuário já existe.")
            }

            throw new CustomError(400, error.message || error.sqlMessage)
        }
    }

    public login = async (email: string, password: string): Promise<string> => {

        try {

            if(!email || !password) {
                throw new Error("Preencha todos os campos.");
            }
    
            const user: User = await userDatabase.getByEmail(email);

            const passwordIsCorrect = await hashManager.compare(password, user.getHashPassword());

            if(!passwordIsCorrect){
                throw new Error("Invalid password.");
            };

            const token: string = authenticator.generateToken({id: user.getId(), role: user.getRole()});

            return token;
            
        } catch (error) {
            let errorMessage = error.message || error.sqlMessage            
            return errorMessage;            
        }            
        
    }
};

export const userBusiness = new UserBusiness()