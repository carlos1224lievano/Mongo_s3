"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositoryFactory = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const mongo_user_repository_1 = require("./databases/mongo/mongo-user-repository");
const mysql_user_repository_1 = require("./databases/mysql/mysql-user-repository");
dotenv_1.default.config();
const db_type = process.env.DB_TYPE;
class RepositoryFactory {
    static createUserRepository() {
        if (db_type === "mysql") {
            console.log("Estamos modo mysql");
            return new mysql_user_repository_1.MySQLUserRepository();
        }
        else if (db_type === "mongo") {
            console.log("Estamos modo mongo");
            return new mongo_user_repository_1.MongoUserRepository();
        }
        throw new Error("Unsupported database type");
    }
}
exports.RepositoryFactory = RepositoryFactory;
