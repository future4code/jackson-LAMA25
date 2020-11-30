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
exports.userDatabase = void 0;
const User_1 = require("../model/User");
const BaseDatabase_1 = require("./BaseDatabase");
class UserDatabase extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.getByEmail = (email) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.getConnection()
                    .select("*")
                    .from("lama_users")
                    .where("email", email);
                return User_1.User.toUserModel(result[0]);
            }
            catch (error) {
                let errorMessage = error.sqlMessage || error.message;
                if (errorMessage.includes("undefined")) {
                    errorMessage = "Invalid email.";
                }
                throw new Error(errorMessage);
            }
        });
    }
    signup(id, name, email, password, role) {
        const _super = Object.create(null, {
            getConnection: { get: () => super.getConnection }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield _super.getConnection.call(this)
                    .insert({ id, name, email, password, role })
                    .into(UserDatabase.tableName);
                return "Sucess";
            }
            catch (error) {
                throw new Error(error.sqlMessage || error.message);
            }
        });
    }
}
UserDatabase.tableName = "lama_users";
exports.userDatabase = new UserDatabase();
//# sourceMappingURL=UserDatabase.js.map