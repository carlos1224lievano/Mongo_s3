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
exports.MongoUserRepository = void 0;
// mongo-user-repository.ts
const user_1 = require("../../../domain/user");
const user_schema_1 = require("../../schemas/user-schema");
const mongoDB_1 = require("./mongoDB");
class MongoUserRepository {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield user_schema_1.UserModel.find();
            return users.map((user) => new user_1.User(user.id, user.name, user.email, user.password));
        });
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (mongoDB_1.mongoose.connection.readyState !== 1) {
                    console.error("Mongoose is not connected");
                    throw new Error("Database not connected");
                }
                const newUser = new user_schema_1.UserModel({
                    name: user.name,
                    email: user.email,
                    password: user.password,
                });
                const savedUser = yield newUser.save();
                return new user_1.User(savedUser.id, savedUser.name, savedUser.email, savedUser.password);
            }
            catch (error) {
                console.error("Error creating user:", error);
                throw error;
            }
        });
    }
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_schema_1.UserModel.findById(userId);
            if (!user) {
                return null;
            }
            return new user_1.User(user.id, user.name, user.email, user.password);
        });
    }
    updateUser(userId, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedUser = yield user_schema_1.UserModel.findByIdAndUpdate(userId, user, {
                new: true,
            });
            if (!updatedUser) {
                return null;
            }
            return new user_1.User(updatedUser.id, updatedUser.name, updatedUser.email, updatedUser.password);
        });
    }
    deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield user_schema_1.UserModel.findByIdAndDelete(userId);
            return result !== null;
        });
    }
}
exports.MongoUserRepository = MongoUserRepository;
