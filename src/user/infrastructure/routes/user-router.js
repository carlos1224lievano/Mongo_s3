"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const dependencies_1 = require("../dependencies");
const userRouter = express_1.default.Router();
exports.userRouter = userRouter;
// ruta: /id/operacion que se esta ejecutando
userRouter.get("/getAll", dependencies_1.userController.getAll.bind(dependencies_1.userController)); // Cuando se ejecute este caso de uso queremos que se ejecute el metodo run(que envia email) del userController
userRouter.post("/create", dependencies_1.userController.create.bind(dependencies_1.userController));
userRouter.get("/:id", dependencies_1.userController.getById.bind(dependencies_1.userController));
userRouter.put("/:id", dependencies_1.userController.update.bind(dependencies_1.userController));
userRouter.delete("/:id", dependencies_1.userController.delete.bind(dependencies_1.userController));
