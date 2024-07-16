import { Request, Response } from "express";
import { GetUserByIdUseCase } from "../../application/useCase/getUserByidUseCase";

export class GetUserByIdController {
    constructor(private readonly getUserByIdUseCase: GetUserByIdUseCase) {}

    async run(req: Request, res: Response) {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).send({
                    status: "error",
                    message: "ID is required."
                });
            }

            const user = await this.getUserByIdUseCase.execute(id);

            if (user) {
                return res.status(200).send({
                    status: "success",
                    data: user
                });
            } else {
                return res.status(404).send({
                    status: "error",
                    message: "User not found."
                });
            }
        } catch (error) {
            console.error("Error in GetUserByIdController:", error);
            return res.status(500).send({
                status: "error",
                message: "An error occurred while getting the user."
            });
        }
    }
}
