import { Request, Response } from "express";
import { GetCattleByBreedUseCase } from "../../application/useCase/getCattleByBreedUseCase";

export class GetCattleByBreedController {
    constructor(private readonly getCattleByBreedUseCase: GetCattleByBreedUseCase) {}

    async run(req: Request, res: Response) {
        try {
            const { breed } = req.query;

            // Asegurarse de que 'breed' es un string
            if (!breed || typeof breed !== 'string') {
                return res.status(400).send({
                    status: "error",
                    message: "La raza es un parámetro obligatorio y debe ser un texto."
                });
            }

            const cattle = await this.getCattleByBreedUseCase.execute(breed);

            return res.status(200).send({
                status: "success",
                data: cattle
            });
        } catch (error) {
            console.error("Error in GetCattleByBreedController:", error);
            return res.status(500).send({
                status: "error",
                message: "Ocurrió un error al obtener el ganado por raza"
            });
        }
    }
}
