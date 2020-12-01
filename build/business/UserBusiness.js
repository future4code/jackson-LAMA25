"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userBusiness = void 0;
const UserDatabase_1 = require("../data/UserDatabase");
const CustomError_1 = require("../errors/CustomError");
const User_1 = require("../model/User");
const Authenticator_1 = require("../services/Authenticator");
const HashManager_1 = require("../services/HashManager");
const IdGenerator_1 = require("../services/IdGenerator");
class UserBusiness {
    constructor() {
        this.signup = (name, email, password, role) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!name ||
                    !email ||
                    !password ||
                    !role) {
                    throw new CustomError_1.CustomError(400, "Preencha todos os campos.");
                }
                ;
                if (!email.includes("@")) {
                    throw new Error("E-mail inválido.");
                }
                ;
                if (password.length < 6) {
                    throw new Error("A senha deve ser maior que 6 caracteres.");
                }
                ;
                const id = IdGenerator_1.idGenerator.generate();
                const hashPassword = yield HashManager_1.hashManager.hash(password);
                const user = new User_1.User(id, name, email, hashPassword, role);
                yield UserDatabase_1.userDatabase.signup(user.getId(), user.getName(), user.getEmail(), hashPassword, user.getRole());
                const token = Authenticator_1.authenticator.generateToken({
                    id: user.getId(),
                    role: user.getRole()
                });
                return ({
                    id: user.getId(),
                    token: token
                });
            }
            catch (error) {
                console.log(error.message);
                if (error.message.includes("Duplicate entry")) {
                    throw new CustomError_1.CustomError(409, "Usuário já existe.");
                }
                throw new CustomError_1.CustomError(400, error.message || error.sqlMessage);
            }
        });
        this.login = (email, password) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!email || !password) {
                    throw new Error("Preencha todos os campos.");
                }
                const user = yield UserDatabase_1.userDatabase.getByEmail(email);
                const passwordIsCorrect = yield HashManager_1.hashManager.compare(password, user.getHashPassword());
                if (!passwordIsCorrect) {
                    throw new Error("Invalid password.");
                }
                ;
                const token = Authenticator_1.authenticator.generateToken({ id: user.getId(), role: user.getRole() });
                return token;
            }
            catch (error) {
                let errorMessage = error.message || error.sqlMessage;
                return errorMessage;
            }
        });
    }
}
;
exports.userBusiness = new UserBusiness();
//# sourceMappingURL=UserBusiness.js.map