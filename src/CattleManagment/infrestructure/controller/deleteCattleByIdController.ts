import { Request, Response } from "express";
import { DeleteCattleByIdUseCase } from "../../application/useCase/deleteCattleByIdUseCase";

export class DeleteCattleByIdController {
    constructor(private readonly deleteCattleByIdUseCase: DeleteCattleByIdUseCase) {}

    async run(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const cattleId = parseInt(id, 10)

            const isDeleted = await this.deleteCattleByIdUseCase.execute(cattleId);

            if (isDeleted) {
                return res.status(200).send({
                    status: "success",
                    message: isDeleted
                });
            } else {
                return res.status(404).send({
                    status: "error",
                    message: "No se encontró el registro de ganado con el ID proporcionado."
                });
            }
        } catch (error) {
            console.error("Error in DeleteCattleByIdController:", error);
            return res.status(500).send({
                status: "error",
                message: "Ocurrió un error al eliminar el registro de ganado."
            });
        }
    }
}
