import { Cattle } from "../../domain/entity/cattle";
import { CattleInterface } from "../../domain/port/cattleInterface";
import { validate } from "class-validator";
import { ValidatorUpdateCattle } from "../../domain/validation/validatorUpdateCattle";
import { UploadedFile } from "express-fileupload";
import uploadToFirebase from "../../../helpers/saveImg";

export class UpdateCattleByIdUseCase {
    constructor(private readonly cattleInterface: CattleInterface) {}

    async execute(
        id: number,
        cattleData: Partial<Cattle>,
        imgFile?: UploadedFile
    ): Promise<Cattle | null> {
        // Crear un nuevo objeto con los valores actualizados
        const updatedCattleData: Partial<Cattle> = {
            ...cattleData,
            weight: cattleData.weight !== undefined ? Number(cattleData.weight) : undefined,
            earringNumber: cattleData.earringNumber !== undefined ? Number(cattleData.earringNumber) : undefined,
            age: cattleData.age !== undefined ? Number(cattleData.age) : undefined,
        };

        // Validar los datos de actualización
        const validator = new ValidatorUpdateCattle(updatedCattleData);
        const validationErrors = await validate(validator);

        if (validationErrors.length > 0) {
            throw new Error(JSON.stringify(validationErrors));
        }

        try {
            // Si hay un archivo de imagen, subirlo a Firebase
            let imageUrl: string | undefined;
            if (imgFile) {
                imageUrl = await uploadToFirebase(imgFile);
            }

            // Obtener los datos actuales del ganado
            const currentCattle = await this.cattleInterface.getCattleById(id);
            if (!currentCattle) {
                return null;
            }

            // Crear un nuevo objeto Cattle con los datos actualizados
            const updatedCattle = {
                ...currentCattle,
                ...updatedCattleData,
                image: imageUrl || currentCattle.image,
            };

            const result = await this.cattleInterface.updateCattleById(id, updatedCattle);
            return result;
        } catch (error) {
            console.error("Error in UpdateCattleByIdUseCase:", error);
            return null;
        }
    }
}
