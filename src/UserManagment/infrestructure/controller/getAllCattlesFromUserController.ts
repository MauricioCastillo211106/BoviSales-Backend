import { Request, Response } from "express";
import { GetCattleByUserUseCase } from "../../application/useCase/getAllCattlesFromUserUseCase";

export class GetCattleByUserController {
    constructor(readonly getCattleByUserUseCase: GetCattleByUserUseCase) {}


    
    async run(req: Request, res: Response) {
        try {
            const userId = req.params.userId;

            const cattleList = await this.getCattleByUserUseCase.run(userId)

            return res.status(200).send({
                status: "success",
                data: cattleList
            });
        } catch (error) {
            console.error("Error in GetCattleByUserController:", error);
            return res.status(500).send({
                status: "error",
                message: "An error occurred while fetching cattle data."
            });
        }
    }
}
