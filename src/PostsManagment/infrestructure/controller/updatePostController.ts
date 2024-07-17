import { Request, Response } from "express";
import { UpdatePostUseCase } from "../../application/useCase/updatePostUseCase";
import { Status } from "../../domain/entity/status";

export class UpdatePostController {
    constructor(private readonly updatePostUseCase: UpdatePostUseCase) {}

    async run(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { idCattle, idUser, description, precio, ubicacion, fecha, status } = req.body;

            if (!id || !idCattle || !idUser || !description || !precio || !ubicacion || !fecha || !status) {
                return res.status(400).send({
                    status: "error",
                    message: "Missing required fields."
                });
            }

            // Validar el estado
            if (!Object.values(Status).includes(status)) {
                return res.status(400).send({
                    status: "error",
                    message: `Invalid status value. Must be one of: ${Object.values(Status).join(', ')}`
                });
            }

            // Convertir valores a números
            const numericIdCattle = Number(idCattle);
            const numericIdUser = Number(idUser);

            // Llama a updatePostUseCase con la información proporcionada
            const updatedPost = await this.updatePostUseCase.execute(
                parseInt(id),
                numericIdCattle,
                numericIdUser,
                description,
                precio,
                ubicacion,
                new Date(fecha),
                status
            );

            if (updatedPost) {
                return res.status(200).send({
                    status: "success",
                    data: updatedPost
                });
            } else {
                return res.status(500).send({
                    status: "error",
                    message: "An error occurred while updating the post."
                });
            }
        } catch (error) {
            console.error("Error in UpdatePostController:", error);
            if (error instanceof Error) {
                if (error.message.startsWith('[')) {
                    return res.status(400).send({
                        status: "error",
                        message: "Validation failed",
                        errors: JSON.parse(error.message)
                    });
                }
            }
            return res.status(500).send({
                status: "error",
                message: "An error occurred while updating the post."
            });
        }
    }
}
