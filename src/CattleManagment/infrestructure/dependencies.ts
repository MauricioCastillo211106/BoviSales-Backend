import { MysqlCattleRepository } from "./repository/mysqlCattleRespository";

import { CreateCattleController } from "./controller/registerCattleController";
import { CreateCattleUseCase } from "../application/useCase/registerCattleUseCase";
import { GetAllCattleController } from "./controller/getAllCattleController";
import { GetAllCattleUseCase } from "../application/useCase/getAllCattleUseCase";
import { GetCattleByIdController } from "./controller/getCattleByIdController";
import { GetCattleByIdUseCase } from "../application/useCase/getCattleByIdUseCase";
import { DeleteCattleByIdController } from "./controller/deleteCattleByIdController";
import { DeleteCattleByIdUseCase } from "../application/useCase/deleteCattleByIdUseCase";
import { UpdateCattleByIdController } from "./controller/updateCattleByIdController";
import { UpdateCattleByIdUseCase } from "../application/useCase/updateCattleByIdUseCase";
import { GetCattleByBreedController } from "./controller/getCattleByBreedController";
import { GetCattleByBreedUseCase } from "../application/useCase/getCattleByBreedUseCase";

const mysqlCattleRepository = new MysqlCattleRepository();

const createCattleUseCase = new CreateCattleUseCase(mysqlCattleRepository);
export const createCattleController = new CreateCattleController(createCattleUseCase);

const getAllCattleUseCase = new GetAllCattleUseCase(mysqlCattleRepository);
export const getAllCattleController = new GetAllCattleController (getAllCattleUseCase)

const getCattleByIdUseCase = new GetCattleByIdUseCase(mysqlCattleRepository);
export const getCattleByIdController = new GetCattleByIdController (getCattleByIdUseCase)

const deleteCattleByIdUseCase = new DeleteCattleByIdUseCase(mysqlCattleRepository);
export const deleteCattleByIdController = new DeleteCattleByIdController (deleteCattleByIdUseCase)

const updateCattleByIdUseCase = new UpdateCattleByIdUseCase(mysqlCattleRepository);
export const updateCattleByIdController = new UpdateCattleByIdController (updateCattleByIdUseCase) 

const getCattleByBreedUseCase = new GetCattleByBreedUseCase(mysqlCattleRepository);
export const getCattleByBreedController = new GetCattleByBreedController(getCattleByBreedUseCase);

