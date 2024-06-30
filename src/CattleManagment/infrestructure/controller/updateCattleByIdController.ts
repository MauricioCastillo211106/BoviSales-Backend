import { Request, Response } from "express";
import { UpdateCattleByIdUseCase } from "../../application/useCase/updateCattleByIdUseCase";
import { UploadedFile } from "express-fileupload";

export class UpdateCattleByIdController {
    constructor(private readonly updateCattleByIdUseCase: UpdateCattleByIdUseCase) {}

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

            const cattleData = req.body;
            const imgFile = req.files ? req.files.image as UploadedFile : undefined;

            // Convertir valores numéricos a números
            if (cattleData.weight !== undefined) {
                cattleData.weight = Number(cattleData.weight);
            }
            if (cattleData.earringNumber !== undefined) {
                cattleData.earringNumber = Number(cattleData.earringNumber);
            }
            if (cattleData.age !== undefined) {
                cattleData.age = Number(cattleData.age);
            }

            // Llamar al caso de uso para actualizar el Cattle
            const updatedCattle = await this.updateCattleByIdUseCase.execute(cattleId, cattleData, imgFile);

            if (updatedCattle) {
                return res.status(200).send({
                    status: "success",
                    message: "El registro de ganado fue actualizado exitosamente.",
                    data: updatedCattle
                });
            } else {
                return res.status(404).send({
                    status: "error",
                    message: "No se encontró el registro de ganado con el ID proporcionado."
                });
            }

        } catch (error) {
            console.error("Error in UpdateCattleByIdController:", error);
            if (error instanceof Error) {
                if (error.message.startsWith('[')) {
                    return res.status(400).send({
                        status: "error",
                        message: "Validación fallida",
                        errors: JSON.parse(error.message)
                    });
                }
            }
            
            return res.status(500).send({
                status: "error",
                message: "Ocurrió un error al actualizar el registro de ganado."
            });
        }
    }
}
