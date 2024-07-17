import { Request, Response } from "express";
import { DeleteUserUseCase } from "../../application/useCase/deleteUserByIdUseCase";

export class DeleteUserController {
    constructor(private readonly deleteUserUseCase: DeleteUserUseCase) {}

    async run(req: Request, res: Response) {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).send({
                    status: "error",
                    message: "User ID is required"
                });
            }

            const result = await this.deleteUserUseCase.deleteUser(id);

            if (result === "Usuario eliminado correctamente") {
                return res.status(200).send({
                    status: "success",
                    message: result
                });
            } else {
                return res.status(500).send({
                    status: "error",
                    message: "An error occurred while deleting the user"
                });
            }
        } catch (error) {
            console.error("Error in DeleteUserController:", error);
            return res.status(500).send({
                status: "error",
                message: "An error occurred while deleting the user"
            });
        }
    }
}
