import express from "express";
import { 
    changeUserPasswordController, 
    createUserController,
    getByEmailController,
    loginUserController,
    getCattleByUserController,
    getUserByIdController,
    deleteUserController 
} from "../dependencies";


export const UserRouter = express.Router();

UserRouter.post("/", createUserController.run.bind(createUserController));
UserRouter.post("/login", loginUserController.run.bind(loginUserController));
UserRouter.get("/email", getByEmailController.get.bind(getByEmailController));
UserRouter.put("/new_password", changeUserPasswordController.run.bind(changeUserPasswordController));
UserRouter.get("/cattle/:userId", getCattleByUserController.run.bind(getCattleByUserController));
UserRouter.get("/:id", getUserByIdController.run.bind(getUserByIdController));
UserRouter.delete("/:id", deleteUserController.run.bind(deleteUserController));