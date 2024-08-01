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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const promise_1 = __importDefault(require("mysql2/promise"));
// Cargar variables de entorno
dotenv_1.default.config();
// Asegurarse de que las variables de entorno están definidas
for (const key of [
    "MYSQL_HOST",
    "MYSQL_PORT",
    "MYSQL_USER",
    "MYSQL_PASSWORD",
    "MYSQL_DATABASE",
]) {
    if (!process.env[key]) {
        throw new Error(`Missing environment variable: ${key}`);
    }
}
// Convertir MYSQL_PORT de string a number
const config = {
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
};
const query = (sql, params) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Connecting to MySQL");
    const conn = yield promise_1.default.createConnection(config);
    try {
        const [rows] = yield conn.execute(sql, params);
        return rows;
    }
    catch (error) {
        console.error("MySQL query error:", error);
        throw error;
    }
    finally {
        console.log("Closing MySQL connection");
        yield conn.end();
    }
});
exports.query = query;
