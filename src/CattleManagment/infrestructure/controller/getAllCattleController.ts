import { Request, Response } from "express";
import { GetAllCattleUseCase } from "../../application/useCase/getAllCattleUseCase";

export class GetAllCattleController {
    constructor(private readonly getAllCattleUseCase: GetAllCattleUseCase) {}

    
    async run(req: Request, res: Response) {
        try {
            const cattleList = await this.getAllCattleUseCase.getAll();
            if (cattleList) {
                return res.status(200).send({
                    status: "success",
                    data: cattleList
                });
            } else {
                return res.status(404).send({
                    status: "error",
                    message: "No se encontraron registros de ganado."
                });
            }
        } catch (error) {
            console.error("Error in GetAllCattleController:", error);
            return res.status(500).send({
                status: "error",
                message: "Ocurrió un error al obtener los registros de ganado."
            });
        }
    }
}