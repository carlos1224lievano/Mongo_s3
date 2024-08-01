"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
// infrastructure/publication-router.ts
const express_1 = __importDefault(require("express"));
const local_file_storage_1 = require("../adapters/storages/local-file-storage");
const dependencies_product_1 = require("../dependencies-product");
const productRouter = express_1.default.Router();
exports.productRouter = productRouter;
productRouter.get("/getAll", dependencies_product_1.productController.getAll.bind(dependencies_product_1.productController));
productRouter.post("/create", local_file_storage_1.upload.single("image"), dependencies_product_1.productController.create.bind(dependencies_product_1.productController));
productRouter.get("/:id", dependencies_product_1.productController.getById.bind(dependencies_product_1.productController));
productRouter.put("/:id", local_file_storage_1.upload.single("image"), dependencies_product_1.productController.update.bind(dependencies_product_1.productController));
productRouter.delete("/:id", dependencies_product_1.productController.delete.bind(dependencies_product_1.productController));
