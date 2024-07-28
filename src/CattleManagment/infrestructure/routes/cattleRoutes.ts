import express  from "express";
import { createCattleController, getAllCattleController,getCattleByIdController,deleteCattleByIdController,updateCattleByIdController,getCattleByBreedController,getCattleByEarringNumberController } from "../dependencies";
export const CattleRouter = express.Router();

CattleRouter.post("/",createCattleController.run.bind(createCattleController));
CattleRouter.get("/getAll",getAllCattleController.run.bind(getAllCattleController));
CattleRouter.get("/:by-breed", getCattleByBreedController.run.bind(getCattleByBreedController));
CattleRouter.get("/by-earring-number", getCattleByEarringNumberController.run.bind(getCattleByEarringNumberController));
CattleRouter.get("/:id",getCattleByIdController.run.bind(getCattleByIdController));
CattleRouter.delete("/:id",deleteCattleByIdController.run.bind(deleteCattleByIdController));
CattleRouter.put("/put/:id",updateCattleByIdController.run.bind(updateCattleByIdController));



