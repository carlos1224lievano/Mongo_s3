"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = exports.deleteUser = exports.updateUser = exports.getUserById = exports.createUserUseCase = exports.getUserListUseCase = void 0;
// CONTIENE LA INSTANCIA DE TODAS LAS DEPENDENCIAS QUE SE ESTARAN UTILIZANDO
const create_user_usecase_1 = __importDefault(require("../application/create-user-usecase"));
const delete_user_usecase_1 = __importDefault(require("../application/delete-user-usecase"));
const get_userById_usecase_1 = require("../application/get-userById-usecase");
const get_userlist_usecase_1 = __importDefault(require("../application/get-userlist-usecase"));
const update_user_usecase_1 = __importDefault(require("../application/update-user-usecase"));
const user_controller_1 = __importDefault(require("./controllers/user-controller"));
const repository_factory_1 = require("./repository-factory");
const userFactoryRepository = repository_factory_1.RepositoryFactory.createUserRepository(); // Esta implemeta el userRepository que necesita el caso de uso
// const mySqlUserReposritory = new MySQLUserRepository();
exports.getUserListUseCase = new get_userlist_usecase_1.default(userFactoryRepository
// mySqlUserReposritory
); //Instancia del Caso de Uso - Se le pasa el user-repository que necesita
exports.createUserUseCase = new create_user_usecase_1.default(userFactoryRepository
// mySqlUserReposritory
);
exports.getUserById = new get_userById_usecase_1.GetUserByID(userFactoryRepository
// mySqlUserReposritory
);
exports.updateUser = new update_user_usecase_1.default(userFactoryRepository
// mySqlUserReposritory
);
exports.deleteUser = new delete_user_usecase_1.default(userFactoryRepository
// mySqlUserReposritory
);
exports.userController = new user_controller_1.default(exports.getUserListUseCase, exports.createUserUseCase, exports.getUserById, exports.updateUser, exports.deleteUser);
