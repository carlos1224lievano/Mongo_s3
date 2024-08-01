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
exports.MySQLUserRepository = void 0;
const user_1 = require("../../../domain/user");
const mysql_1 = require("./mysql");
class MySQLUserRepository {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "SELECT * FROM users";
            const rows = (yield (0, mysql_1.query)(sql, []));
            console.log("=>", rows);
            // if (rows.length === 0) {
            //   return null;
            // }
            return rows.map((row) => new user_1.User(row.id, row.name, row.email, row.password));
            // falta retornar null
        });
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
            const params = [user.name, user.email, user.password];
            const result = yield (0, mysql_1.query)(sql, params);
            // if (result.length === 0) {
            //   return null;
            // }
            return new user_1.User(result.insertId, user.name, user.email, user.password);
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "SELECT * FROM users WHERE id = ?";
            const params = [id];
            // const [rows]: any = await query(sql, params);
            const rows = (yield (0, mysql_1.query)(sql, params));
            // const [rows]: any[] = await query(sql, params);
            if (rows.length === 0) {
                return null;
            }
            const row = rows[0];
            const user = new user_1.User(row.id, row.name, row.email, row.password);
            console.log(user);
            return user;
        });
    }
    updateUser(id, newUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "UPDATE users SET name=?, email=?, password=? WHERE id = ?";
            const params = [newUser.name, newUser.email, newUser.password, id];
            const result = yield (0, mysql_1.query)(sql, params);
            if (result.affectedRows === 0) {
                return null;
            }
            return yield this.getUserById(id); // Obtener el usuario actualizado para devolverlo
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "DELETE FROM users WHERE id = ?";
            const params = [id];
            const result = yield (0, mysql_1.query)(sql, params);
            return result.affectedRows > 0;
        });
    }
}
exports.MySQLUserRepository = MySQLUserRepository;
