import { Breed } from "../../domain/entity/breed";
import { Cattle } from "../../domain/entity/cattle";
import { CattleGender } from "../../domain/entity/cattleGender";
import { CattleInterface } from "../../domain/port/cattleInterface";
import { CattleValidator } from "../../domain/validation/cattleValidator";
import { validate } from "class-validator";

export class CreateCattleUseCase {
    constructor(readonly cattleInterface: CattleInterface) {}

    async run(
        name: string,
        weight: number,
        earringNumber: number,
        age: number,
        gender: CattleGender,
        breed: Breed,
        image: string,
        id_user: number
    ): Promise<Cattle | null | string> {
        // Crear la instancia de validación
        const validator = new CattleValidator(
            name,
            weight,
            earringNumber,
            age,
            gender,
            breed,
            image
        );

        // Validar la instancia
        const validationErrors = await validate(validator);
        if (validationErrors.length > 0) {
            throw new Error(JSON.stringify(validationErrors));
        }

        // Crear la instancia de Cattle
        try {
            const newCattle = new Cattle(
                name,
                weight,
                earringNumber,
                age,
                gender,
                breed,
                image, 
                id_user
            );

            // Guardar la instancia en la base de datos a través de la interfaz
            const createdCattle = await this.cattleInterface.createCattle(newCattle);
            return createdCattle;
        } catch (error) {
            console.error("Error creating Cattle:", error);
            return null;
        }
    }
}
