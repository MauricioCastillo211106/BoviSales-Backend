import { Request, Response } from "express";
import { CreatePublicUseCase } from "../../application/useCase/createPostUseCase";
import { Status } from "../../domain/entity/status";

export class CreatePostController {
    constructor(
        readonly createPublicUseCase: CreatePublicUseCase
    ) {}

    async run(req: Request, res: Response) {
        try {
            const { idCattle, idUser, description, precio, ubicacion, fecha, status } = req.body;

            if (!idCattle || !idUser || !description || !precio || !ubicacion || !fecha || !status) {
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

            // Llama a createPostUseCase con la información proporcionada
            const newPost = await this.createPublicUseCase.create(
                idCattle,
                idUser,
                description,
                precio,
                ubicacion,
                new Date(fecha),
                status
            );

            if (newPost) {
                return res.status(201).send({
                    status: "success",
                    data: newPost
                });
            } else {
                return res.status(500).send({
                    status: "error",
                    message: "An error occurred while adding the post."
                });
            }
        } catch (error) {
            if (error instanceof Error) {
                if (error.message.startsWith('[')) {
                    return res.status(400).send({
                        status: "error",
                        message: "Validation failed",
                        errors: JSON.parse(error.message)
                    });
                } else if (error.message === "El texto contiene palabras ofensivas y no puede ser publicado.") {
                    return res.status(400).send({
                        status: "error",
                        message: error.message
                    });
                }
            }
            return res.status(500).send({
                status: "error",
                message: "An error occurred while adding the post."
            });
        }
    }
}
