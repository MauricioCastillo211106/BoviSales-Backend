import express  from "express";
import { createUserController } from "../dependencies";

export const UserRouter = express.Router();

UserRouter.post("/",createUserController.run.bind(createUserController));