"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const product_router_1 = require("./product/infrastructure/routes/product-router");
const user_router_1 = require("./user/infrastructure/routes/user-router");
function boostrap() {
    const app = (0, express_1.default)();
    app.use(body_parser_1.default.json());
    app.use("/users", user_router_1.userRouter);
    app.use("/products", product_router_1.productRouter);
    const { port } = config_1.config.server;
    app.listen(port, () => {
        console.log(`[APP] - Starting application on port ${port}`);
    });
}
boostrap();
