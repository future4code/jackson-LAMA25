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
exports.bandBusiness = exports.BandBusiness = void 0;
const BandDatabase_1 = require("../data/BandDatabase");
const CustomError_1 = require("../errors/CustomError");
const Authenticator_1 = require("../services/Authenticator");
const IdGenerator_1 = require("../services/IdGenerator");
class BandBusiness {
    registerBand(token, name, music_genre, responsible) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!name) {
                    throw new CustomError_1.CustomError(409, "Fill in all fields.");
                }
                const tokenData = Authenticator_1.authenticator.getData(token);
                if (!tokenData || tokenData.role === "NORMAL") {
                    throw new CustomError_1.CustomError(401, "Unauthorized user.");
                }
                const id = IdGenerator_1.idGenerator.generate();
                const result = yield BandDatabase_1.bandDatabase.registerBand(id, name, music_genre, responsible);
                if (result === undefined) {
                    throw new CustomError_1.CustomError(400, "bad request");
                }
            }
            catch (error) {
                throw new Error(error.message || error.sqlMessage);
            }
        });
    }
}
exports.BandBusiness = BandBusiness;
exports.bandBusiness = new BandBusiness();
//# sourceMappingURL=BandBusiness.js.map