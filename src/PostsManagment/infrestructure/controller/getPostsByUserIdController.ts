import { Request, Response } from "express";
import { GetPostsByUserIdUseCase } from "../../application/useCase/getPostsByUserIdUseCase";

export class GetPostsByUserIdController {
    constructor(private readonly getPostsByUserIdUseCase: GetPostsByUserIdUseCase) {}

    async run(req: Request, res: Response) {
        try {
            const { userId } = req.params;

            if (!userId) {
                return res.status(400).send({
                    status: "error",
                    message: "User ID is required"
                });
            }

            const posts = await this.getPostsByUserIdUseCase.execute(parseInt(userId, 10));

            if (posts) {
                return res.status(200).send({
                    status: "success",
                    data: posts
                });
            } else {
                return res.status(404).send({
                    status: "error",
                    message: "No posts found for the given user ID"
                });
            }
        } catch (error) {
            console.error("Error in GetPostsByUserIdController:", error);
            return res.status(500).send({
                status: "error",
                message: "An error occurred while fetching the posts"
            });
        }
    }
}
