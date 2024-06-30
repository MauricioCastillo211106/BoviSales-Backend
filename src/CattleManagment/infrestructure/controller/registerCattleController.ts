import { Request, Response } from "express";
import { CreateCattleUseCase } from "../../application/useCase/registerCattleUseCase";
import { CattleGender } from "../../domain/entity/cattleGender";
import { Breed } from "../../domain/entity/breed";
import { UploadedFile } from "express-fileupload";
import uploadToFirebase from "../../../helpers/saveImg";

export class CreateCattleController {
    constructor(readonly createCattleUseCase: CreateCattleUseCase) {}

    async run(req: Request, res: Response) {
        try {
            // Extraer datos del cuerpo de la solicitud y convertir a números
            const { name, gender, breed } = req.body;
            const weight = Number(req.body.weight);
            const earringNumber = Number(req.body.earringNumber);
            const age = Number(req.body.age);
            const id_user = Number(req.body.id_user);

            // Verificar que los valores numéricos son válidos
            if (isNaN(weight) || isNaN(earringNumber) || isNaN(age)) {
                return res.status(400).send({
                    status: "error",
                    message: "Invalid numeric values for weight, earringNumber, or age."
                });
            }

            const imgFile = req.files ? req.files.image as UploadedFile : null;
            if (!imgFile) {
                return res.status(400).send({
                    status: "error",
                    message: "No file uploaded."
                });
            }
            const imagenUrl = await uploadToFirebase(imgFile);
            

            // Usar valores predeterminados si no se proporcionan
            const cattleGender = (gender as CattleGender) || CattleGender.male;
            const cattleBreed = (breed as Breed) || Breed.BRAHMAN;

            // Validar que los valores de gender y breed son válidos
            if (!Object.values(CattleGender).includes(cattleGender)) {
                return res.status(400).send({
                    status: 'error',
                    message: `Invalid gender value. Must be one of: ${Object.values(CattleGender).join(', ')}`
                });
            }

            if (!Object.values(Breed).includes(cattleBreed)) {
                return res.status(400).send({
                    status: 'error',
                    message: `Invalid breed value. Must be one of: ${Object.values(Breed).join(', ')}`
                });
            }

            // Crear el objeto Cattle utilizando el caso de uso
            const cattle = await this.createCattleUseCase.run(
                name,
                weight,
                earringNumber,
                age,
                cattleGender,
                cattleBreed,
                imagenUrl,
                id_user
            );

            // Si la creación fue exitosa, devolver la respuesta con estado 201
            if (cattle) {
                return res.status(201).send({
                    status: "success",
                    message: "Ganado creado exitosamente",
                    data: cattle
                });
            } else {
                return res.status(500).send({
                    status: "error",
                    message: "Error al crear el ganado, inténtalo más tarde"
                });
            }

        } catch (error) {
            console.error("Error in CreateCattleController:", error);
            if (error instanceof Error) {
                if (error.message.startsWith('[')) {
                    return res.status(400).send({
                        status: "error",
                        message: "Validation failed",
                        errors: JSON.parse(error.message)
                    });
                }
            }
            return res.status(500).send({
                status: "error",
                message: "Ocurrió un error al crear el ganado."
            });
        }
    }
}
