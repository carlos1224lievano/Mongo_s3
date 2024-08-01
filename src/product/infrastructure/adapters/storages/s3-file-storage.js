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
exports.S3FileStorage = void 0;
// src/file-storage/s3-file-storage.ts
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
aws_sdk_1.default.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    sessionToken: process.env.AWS_SESSION_TOKEN,
    region: process.env.AWS_REGION,
});
const s3 = new aws_sdk_1.default.S3();
class S3FileStorage {
    uploadFile(file) {
        return __awaiter(this, void 0, void 0, function* () {
            const localPath = file.path;
            const fileKey = `images/${Date.now()}-${file.originalname}`;
            const params = {
                Bucket: "liova",
                Key: fileKey,
                Body: fs_1.default.createReadStream(localPath),
                ContentType: file.mimetype,
            };
            const uploadResult = yield s3.upload(params).promise();
            return uploadResult.Location;
        });
    }
    deleteFile(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            const fileKey = path_1.default.basename(filePath);
            yield s3
                .deleteObject({ Bucket: "liova", Key: `images/${fileKey}` })
                .promise();
        });
    }
}
exports.S3FileStorage = S3FileStorage;
// PARA CUANDO TENGO AWS CLI CONFIGURADO EN MI ENTORNO
// import AWS from 'aws-sdk';
// // AWS SDK automáticamente usará las credenciales configuradas por AWS CLI
// export const s3 = new AWS.S3();
