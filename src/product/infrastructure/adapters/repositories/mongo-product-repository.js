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
exports.MongoProductRepository = void 0;
const product_1 = require("../../../domain/product");
const product_schema_1 = require("../../product-schema");
class MongoProductRepository {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield product_schema_1.ProductModel.find();
            return product.map((pub) => new product_1.Product(pub.id, pub.title, pub.especific, pub.price, pub.image, pub.image_s3));
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield product_schema_1.ProductModel.findById(id);
            return product
                ? new product_1.Product(product.id, product.title, product.especific, product.price, product.image, product.image_s3)
                : null;
        });
    }
    create(product) {
        return __awaiter(this, void 0, void 0, function* () {
            const newProduct = new product_schema_1.ProductModel(product);
            const savedProduct = yield newProduct.save();
            return new product_1.Product(savedProduct.id, savedProduct.title, savedProduct.especific, savedProduct.price, savedProduct.image, savedProduct.image_s3);
        });
    }
    update(id, product) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedProduct = yield product_schema_1.ProductModel.findByIdAndUpdate(id, product, {
                new: true,
            });
            return updatedProduct
                ? new product_1.Product(updatedProduct.id, updatedProduct.title, updatedProduct.especific, updatedProduct.price, updatedProduct.image, updatedProduct.image_s3)
                : null;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield product_schema_1.ProductModel.findByIdAndDelete(id);
            return result !== null;
        });
    }
}
exports.MongoProductRepository = MongoProductRepository;
