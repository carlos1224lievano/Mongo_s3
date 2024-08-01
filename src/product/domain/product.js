"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
class Product {
    constructor(id, title, especific, price, image, image_s3) {
        this.id = id;
        this.title = title;
        this.especific = especific;
        this.price = price;
        this.image = image;
        this.image_s3 = image_s3;
    }
}
exports.Product = Product;
