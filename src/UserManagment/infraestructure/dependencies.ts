import { MysqlUserRepository } from "./repository/mysqlUserRepository";

import { CreateUserController } from "./controller/createUserContoller";
import { CreateUserUseCase } from "../application/useCase/createUserUseCase";


export const mysqlUserRepository = new MysqlUserRepository();

export const createUserUseCase = new CreateUserUseCase(mysqlUserRepository);
export const createUserController = new CreateUserController(createUserUseCase);