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
exports.MySQLProductRepository = void 0;
const product_1 = require("../../../domain/product");
const mysql_1 = require("../../databases/mysql");
class MySQLProductRepository {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "SELECT * FROM publications";
            const rows = (yield (0, mysql_1.query)(sql, [])); // Ajuste de tipo aquí
            return rows.map((row) => new product_1.Product(row.id, row.title, row.especific, row.price, row.image, row.image_s3));
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "SELECT * FROM product WHERE id = ?";
            const params = [id];
            const [rows] = yield (0, mysql_1.query)(sql, params);
            if (rows.length === 0) {
                return null;
            }
            const row = rows[0];
            return new product_1.Product(row.id, row.title, row.especific, row.price, row.image, row.image_s3);
        });
    }
    create(product) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "INSERT INTO product (title, especific, price, image, image_s3) VALUES (?, ?, ?, ?, ?)";
            const params = [
                product.title,
                product.especific,
                product.price,
                product.image,
                product.image_s3,
            ];
            const result = yield (0, mysql_1.query)(sql, params);
            return new product_1.Product(result.insertId, product.title, product.especific, product.price, product.image, product.image_s3);
        });
    }
    update(id, product) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `UPDATE publications SET 
                 title = COALESCE(?, title), 
                 especific = COALESCE(?, especific), 
                 price = COALESCE(?, price), 
                 image = COALESCE(?, image), 
                 image_s3 = COALESCE(?, image_s3) 
                 WHERE id = ?`;
            const params = [
                product.title,
                product.especific,
                product.price,
                product.image,
                product.image_s3,
                id,
            ];
            const result = yield (0, mysql_1.query)(sql, params);
            if (result.affectedRows === 0) {
                return null;
            }
            return yield this.getById(id); // Obtener la producto actualizado para devolverlo
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "DELETE FROM product WHERE id = ?";
            const params = [id];
            const result = yield (0, mysql_1.query)(sql, params);
            return result.affectedRows > 0;
        });
    }
}
exports.MySQLProductRepository = MySQLProductRepository;
