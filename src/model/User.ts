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
    getId(){ 
        return this.id
    }

    getName() {
        return this.name
    }

    getEmail() {
        return this.email
    }

    getHashPassword() {
        return this.password
    }

    getRole() {
        return this.role
    }

    public static toUserModel(object: any): User{
        return new User(object.id, object.name, object.email, object.password, object.role);
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