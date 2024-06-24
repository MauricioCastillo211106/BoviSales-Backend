import { Request, Response } from "express";
import { GetCattleByIdUseCase } from "../../application/useCase/getCattleByIdUseCase";

export class GetCattleByIdController {
    constructor(private readonly getCattleByIdUseCase: GetCattleByIdUseCase) {}

    async run(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const cattleId = parseInt(id, 10);

            if (isNaN(cattleId)) {
                return res.status(400).send({
                    status: "error",
                    message: "ID inválido. Debe ser un número entero."
                });
            }

            const cattle = await this.getCattleByIdUseCase.execute(cattleId);

            if (cattle) {
                return res.status(200).send({
                    status: "success",
                    data: cattle
                });
            } else {
                return res.status(404).send({
                    status: "error",
                    message: "No se encontró el registro de ganado con el ID proporcionado."
                });
            }
        } catch (error) {
            console.error("Error in GetCattleByIdController:", error);
            return res.status(500).send({
                status: "error",
                message: "Ocurrió un error al obtener el registro de ganado."
            });
        }
    }
}
