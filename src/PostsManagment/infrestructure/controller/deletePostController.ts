import { Request, Response } from "express";
import { DeletePostUseCase } from "../../application/useCase/deletePostUseCase";

export class DeletePostController {
    constructor(private readonly deletePostUseCase: DeletePostUseCase) {}

    async run(req: Request, res: Response) {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).send({
                    status: "error",
                    message: "Post ID is required"
                });
            }

            const result = await this.deletePostUseCase.execute(parseInt(id));

            if (result === "Post eliminado correctamente") {
                return res.status(200).send({
                    status: "success",
                    message: result
                });
            } else if (result === "Post no encontrado") {
                return res.status(404).send({
                    status: "error",
                    message: result
                });
            } else {
                return res.status(500).send({
                    status: "error",
                    message: "An error occurred while deleting the post"
                });
            }
        } catch (error) {
            console.error("Error in DeletePostController:", error);
            return res.status(500).send({
                status: "error",
                message: "An error occurred while deleting the post"
            });
        }
    }
}
