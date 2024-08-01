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
const local_file_storage_1 = require("../adapters/storages/local-file-storage");
const s3_file_storage_1 = require("../adapters/storages/s3-file-storage");
const localFileStorage = new local_file_storage_1.LocalFileStorage();
const s3FileStorage = new s3_file_storage_1.S3FileStorage();
class ProductController {
    constructor(getProductListUseCase, createProductUseCase, getProductByID, updateProductUseCase, deleteProductUseCase) {
        this.getProductListUseCase = getProductListUseCase;
        this.createProductUseCase = createProductUseCase;
        this.getProductByID = getProductByID;
        this.updateProductUseCase = updateProductUseCase;
        this.deleteProductUseCase = deleteProductUseCase;
    }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productPayload = req.body;
                const file = req.file;
                if (!file) {
                    return res.status(400).send("No file uploaded");
                }
                // Guardar archivo localmente
                const localFilePath = yield localFileStorage.uploadFile(file);
                // Subir imagen a S3
                const s3FilePath = yield s3FileStorage.uploadFile(file);
                const productData = Object.assign(Object.assign({}, productPayload), { image: localFilePath, image_s3: s3FilePath });
                const product = yield this.createProductUseCase.execute(productData);
                res.status(201).json(product);
            }
            catch (error) {
                next(error);
            }
            finally {
                if (req.file) {
                    console.log("Producto creado :)");
                }
            }
        });
    }
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield this.getProductListUseCase.execute();
                res.json(product);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield this.getProductByID.run(req.params.id);
                res.json(product);
            }
            catch (error) {
                next(error);
            }
        });
    }
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productId = req.params.id;
                const productPayload = req.body;
                const file = req.file;
                // Obtener la publicación existente
                const existingProduct = yield this.getProductByID.run(productId);
                if (!existingProduct) {
                    return res.status(404).send("Prduct don´t wanted");
                }
                // Eliminar imagen antigua si existe una nueva
                if (file) {
                    yield localFileStorage.deleteFile(existingProduct.image);
                    yield s3FileStorage.deleteFile(existingProduct.image_s3);
                    // Guardar archivo localmente
                    const localFilePath = yield localFileStorage.uploadFile(file);
                    // Subir imagen a S3
                    const s3FilePath = yield s3FileStorage.uploadFile(file);
                    productPayload.image = localFilePath;
                    productPayload.image_s3 = s3FilePath;
                }
                const updatedProduct = yield this.updateProductUseCase.execute(productId, productPayload);
                res.json(updatedProduct);
            }
            catch (error) {
                next(error);
            }
            finally {
                if (req.file) {
                    console.log("producto creada :)");
                }
            }
        });
    }
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productId = req.params.id;
                // Obtener la publicación existente
                const existingProduct = yield this.getProductByID.run(productId);
                if (!existingProduct) {
                    return res.status(404).send("product not found");
                }
                // Eliminar imagen de S3
                yield s3FileStorage.deleteFile(existingProduct.image_s3);
                // Eliminar imagen del almacenamiento local
                yield localFileStorage.deleteFile(existingProduct.image);
                const result = yield this.deleteProductUseCase.execute(productId);
                res.status(result ? 200 : 404).json({ success: result });
            }
            catch (error) {
                next(error);
            }
            finally {
                if (req.file) {
                    console.log("producto creado :)");
                }
            }
        });
    }
}
exports.default = ProductController;
