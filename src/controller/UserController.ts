import { Request, Response } from "express";
import { userBusiness } from "../business/UserBusiness";
import { UserBusinessSignUpOutputDTO, UserInputControllerDTO, UserInputLoginDTO } from "../model/User";

export class UserController {

    public signup = async (req: Request, res: Response): Promise<void> => {
        try {
            const input: UserInputControllerDTO = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                role: req.body.role
            }
            
            const token: UserBusinessSignUpOutputDTO = await userBusiness.signup(
                input.name, 
                input.email, 
                input.password, 
                input.role
            )

            res.status(200).send(token);

        } catch (error) {
            res.status(error.code).send(error.message || error.sqlMessage);
        }
    }

    public login = async (req: Request, res: Response): Promise<void> => {
        try {
            const input: UserInputLoginDTO = {
                email: req.body.email,
                password: req.body.password
            }

            const token = await userBusiness.login(input.email, input.password);

            res.status(200).send(token)
        } catch (error) {
            res.status(error.code).send(error.message || error.sqlMessage)
        }
        
    }
}