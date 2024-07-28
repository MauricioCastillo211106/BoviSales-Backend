import { Request, Response } from "express";
import { GetCattleByEarringNumberUseCase } from "../../application/useCase/getCattleByEarringNumberUseCase";

export class GetCattleByEarringNumberController {
    constructor(private readonly getCattleByEarringNumberUseCase: GetCattleByEarringNumberUseCase) {}

    async run(req: Request, res: Response) {
        try {
            const { earringNumber } = req.query;

            if (!earringNumber || isNaN(Number(earringNumber))) {
                return res.status(400).send({
                    status: "error",
                    message: "El número de arete es un parámetro obligatorio y debe ser un número."
                });
            }

            const cattle = await this.getCattleByEarringNumberUseCase.execute(Number(earringNumber));

            if (cattle) {
                return res.status(200).send({
                    status: "success",
                    data: cattle
                });
            } else {
                return res.status(404).send({
                    status: "error",
                    message: "No se encontró el ganado con el número de arete proporcionado."
                });
            }
        } catch (error) {
            console.error("Error in GetCattleByEarringNumberController:", error);
            return res.status(500).send({
                status: "error",
                message: "Ocurrió un error al obtener el ganado por número de arete"
            });
        }
    }
}
