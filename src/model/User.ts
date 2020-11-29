export class User {
    private id: string
    private name: string
    private email: string
    private password: string
    private role: string

    constructor(
        id: string,
        name: string,
        email: string,
        password: string,
        role: string,
    ){
        this.id = id,
        this.name = name,
        this.email = email,
        this.password = password,
        this.role = role

        if(role.toUpperCase() === USER_ROLES.ADMIN){
            this.role = role
        } else if (role.toUpperCase() === USER_ROLES.NORMAL){
            this.role = role
        } else {
            throw new Error("Please send a valid USER_ROLES. Valid values ​​are ADMIN or NORMAL.")
        }
    }

    // apenas para pegar os nomes. Não é possível alterar
    public getId = () => this.id
    public getName = () => this.name
    public getEmail = () => this.email
    public getHashPassword = () => this.password
    public getRole = () => this.role

    public toUserModel = (result: any): UserModel => {
        const user: UserModel = {
            id: result.id,
            name: result.name,
            email: result.email,
            password: result.password,
            role: result.role
        }

        return user
    }
}

export enum USER_ROLES {
    ADMIN = "ADMIN",
    NORMAL = "NORMAL"
}

export interface UserInputControllerDTO {
    name: string,
    email: string,
    password: string,
    role: string
}

export interface UserBusinessSignUpOutputDTO {
    id: string,
    token: string
}

export interface UserInputLoginDTO {
    email: string,
    password: string
}

export interface UserModel {
    id: string,
    name: string,
    email: string,
    password: string,
    role: string
}