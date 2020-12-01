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
exports.BandController = void 0;
const BandBusiness_1 = require("../business/BandBusiness");
const CustomError_1 = require("../errors/CustomError");
class BandController {
    constructor() {
        this.registerBand = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const inputBand = {
                    name: req.body.name,
                    music_genre: req.body.music_genre,
                    responsible: req.body.responsible
                };
                yield BandBusiness_1.bandBusiness.registerBand(token, inputBand.name, inputBand.music_genre, inputBand.responsible);
                res.status(200).send({
                    message: "Band created successfully."
                });
            }
            catch (error) {
                throw new CustomError_1.CustomError(400, error.message || error.sqlMessage);
            }
        });
    }
}
exports.BandController = BandController;
//# sourceMappingURL=BandController.js.map