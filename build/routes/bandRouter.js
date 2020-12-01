"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bandController = exports.bandRouter = void 0;
const express_1 = __importDefault(require("express"));
const BandController_1 = require("../controller/BandController");
exports.bandRouter = express_1.default.Router();
exports.bandController = new BandController_1.BandController();
exports.bandRouter.post("/register", exports.bandController.registerBand);
//# sourceMappingURL=bandRouter.js.map