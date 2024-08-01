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
class DeleteProductUseCase {
    constructor(poductRepository) {
        this.poductRepository = poductRepository;
    }
    execute(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.poductRepository.delete(productId);
            if (!result) {
                throw new Error(`No se pudo eliminar el producto con id: ${productId}`);
            }
            console.log(`Alsa de producto con id: ${productId} ha sido eliminado`);
            return result; // Devuelve un booleano
        });
    }
}
exports.default = DeleteProductUseCase;
