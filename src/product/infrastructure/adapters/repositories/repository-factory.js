"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositoryFactory = void 0;
// infrastructure/repository-factory.ts
const dotenv_1 = __importDefault(require("dotenv"));
const mongo_product_repository_1 = require("./mongo-product-repository");
const mysql_product_repository_1 = require("./mysql-product-repository");
dotenv_1.default.config();
const db_type = process.env.DB_TYPE; // memoria
class RepositoryFactory {
    static createProductRepository() {
        if (db_type === "mysql") {
            console.log("Estamos en mysql");
            return new mysql_product_repository_1.MySQLProductRepository();
        }
        else if (db_type === "mongo") {
            console.log("Estamos en mongo");
            return new mongo_product_repository_1.MongoProductRepository();
        }
        throw new Error("Unsupported database type");
    }
}
exports.RepositoryFactory = RepositoryFactory;
