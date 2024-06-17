import { MysqlUserRepository } from "./repository/mysqlUserRepository";

import { CreateUserController } from "./controller/createUserContoller";
import { CreateUserUseCase } from "../application/useCase/createUserUseCase";

import { LoginUserUseCase } from "../application/useCase/loginUserUseCase";
import { LoginUserController } from "./controller/loginUserController";

const mysqlUserRepository = new MysqlUserRepository();

const createUserUseCase = new CreateUserUseCase(mysqlUserRepository);
export const createUserController = new CreateUserController(createUserUseCase);

const loginUserUseCase = new LoginUserUseCase(mysqlUserRepository);
export const loginUserController = new LoginUserController(loginUserUseCase)