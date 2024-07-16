import { MysqlPostRepository } from "./repository/mysqlPostRepository";
import { CreatePublicUseCase } from "../application/useCase/createPostUseCase";
import { GetUserByIdUseCase } from "../../UserManagment/application/useCase/getUserByidUseCase";
import { MysqlUserRepository } from "../../UserManagment/infrestructure/repository/mysqlUserRepository";
import { CreatePostController } from "./controller/createPostController";

// Repositorios
const postRepository = new MysqlPostRepository();
const userRepository = new MysqlUserRepository();

// Casos de Uso
const createPostUseCase = new CreatePublicUseCase (postRepository);
const getUserByIdUseCase = new GetUserByIdUseCase(userRepository);

// Controladores
export const createPostController = new CreatePostController(createPostUseCase);
