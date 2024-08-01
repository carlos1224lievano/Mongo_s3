"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoose = exports.db = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
exports.mongoose = mongoose_1.default;
// Cargar las variables de entorno desde el archivo .env
dotenv_1.default.config();
// Obtener la URI de MongoDB desde las variables de entorno
const mongoUri = process.env.MONGO_URI;
// Verificar que la URI se haya cargado correctamente
console.log("MONGO_URI:", mongoUri);
if (!mongoUri) {
    throw new Error("MONGO_URI no está definida en el archivo .env");
}
// Opciones de conexión mejoradas
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 10000,
    serverSelectionTimeoutMS: 10000, // 10 segundos de tiempo de espera de selección del servidor
};
// Conectar a MongoDB
mongoose_1.default
    .connect(mongoUri, options)
    .then(() => {
    console.log("Connected to MongoDB");
})
    .catch((error) => {
    console.error("Connection error:", error.message);
});
const db = mongoose_1.default.connection;
exports.db = db;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
    console.log("Connected to MongoDB");
});
