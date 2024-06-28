import { MysqlUserRepository } from "./repository/mysqlUserRepository";

import { CreateUserController } from "./controller/createUserContoller";
import { CreateUserUseCase } from "../application/useCase/createUserUseCase";

import { LoginUserUseCase } from "../application/useCase/loginUserUseCase";
import { LoginUserController } from "./controller/loginUserController";

import { ChangeUserPasswordUseCase } from "../application/useCase/changePasswordUseCase";
import { ChangeUserPasswordController } from "./controller/changePasswordController";

import { GetByEmailUseCase } from "../application/useCase/getByEmailUseCase";
import { GetByEmailController } from "./controller/getByEmailController";

import { GetCattleByUserUseCase } from "../application/useCase/getAllCattlesFromUserUseCase";
import { GetCattleByUserController } from "./controller/getAllCattlesFromUserController";

const mysqlUserRepository = new MysqlUserRepository();

const createUserUseCase = new CreateUserUseCase(mysqlUserRepository);
export const createUserController = new CreateUserController(createUserUseCase);

const loginUserUseCase = new LoginUserUseCase(mysqlUserRepository);
export const loginUserController = new LoginUserController(loginUserUseCase)

const changeUserPasswordUseCase = new ChangeUserPasswordUseCase(mysqlUserRepository);
export const changeUserPasswordController  = new ChangeUserPasswordController (changeUserPasswordUseCase)

const getByEmailUseCase = new GetByEmailUseCase(mysqlUserRepository);
export const getByEmailController  = new GetByEmailController (getByEmailUseCase)

const getCattleByUserUseCase = new GetCattleByUserUseCase(mysqlUserRepository);
export const getCattleByUserController  = new GetCattleByUserController (getCattleByUserUseCase)


