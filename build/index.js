"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const userRouter_1 = require("./routes/userRouter");
const bandRouter_1 = require("./routes/bandRouter");
const app = express_1.default();
app.use(express_1.default.json());
app.use(cors_1.default());
app.use("/user", userRouter_1.userRouter);
app.use("/band", bandRouter_1.bandRouter);
app.listen(3003, () => {
    console.log("Servidor is running..");
});
//# sourceMappingURL=index.js.map