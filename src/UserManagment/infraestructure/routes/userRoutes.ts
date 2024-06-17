import express  from "express";
import { createUserController,loginUserController } from "../dependencies";

export const UserRouter = express.Router();

UserRouter.post("/",createUserController.run.bind(createUserController));
UserRouter.post("/login",loginUserController.run.bind(loginUserController));
