import express  from "express";
import { changeUserPasswordController, createUserController,getByEmailController,loginUserController } from "../dependencies";

export const UserRouter = express.Router();

UserRouter.post("/",createUserController.run.bind(createUserController));
UserRouter.post("/login",loginUserController.run.bind(loginUserController));
UserRouter.get("/email", getByEmailController.get.bind(getByEmailController));
UserRouter.put("/new_password", changeUserPasswordController.run.bind(changeUserPasswordController))

