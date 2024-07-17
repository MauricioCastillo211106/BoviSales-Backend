import { Request, Response } from "express";
import { GetAllPostsUseCase } from "../../application/useCase/getAllPostsUseCase";

export class GetAllPostsController {
    constructor(private readonly getAllPostsUseCase: GetAllPostsUseCase) {}

    async run(req: Request, res: Response) {
        try {
            const posts = await this.getAllPostsUseCase.execute();

            if (posts) {
                return res.status(200).send({
                    status: "success",
                    data: posts
                });
            } else {
                return res.status(404).send({
                    status: "error",
                    message: "No posts found"
                });
            }
        } catch (error) {
            console.error("Error in GetAllPostsController:", error);
            return res.status(500).send({
                status: "error",
                message: "An error occurred while fetching the posts"
            });
        }
    }
}
