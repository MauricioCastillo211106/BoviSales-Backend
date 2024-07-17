import { Request, Response } from "express";
import { GetPostByIdUseCase } from "../../application/useCase/getPostByIdUseCase";

export class GetPostByIdController {
    constructor(private readonly getPostByIdUseCase: GetPostByIdUseCase) {}

    async run(req: Request, res: Response) {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).send({
                    status: "error",
                    message: "Post ID is required"
                });
            }

            const post = await this.getPostByIdUseCase.execute(parseInt(id));

            if (post) {
                return res.status(200).send({
                    status: "success",
                    data: post
                });
            } else {
                return res.status(404).send({
                    status: "error",
                    message: "Post not found"
                });
            }
        } catch (error) {
            console.error("Error in GetPostByIdController:", error);
            return res.status(500).send({
                status: "error",
                message: "An error occurred while retrieving the post"
            });
        }
    }
}
