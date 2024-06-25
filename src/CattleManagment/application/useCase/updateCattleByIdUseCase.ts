import { Cattle } from "../../domain/entity/cattle";
import { CattleInterface } from "../../domain/port/cattleInterface";
import { validate } from "class-validator";
import { ValidatorUpdateCattle } from "../../domain/validation/validatorUpdateCattle";

export class UpdateCattleByIdUseCase {
    constructor(private readonly cattleInterface:  CattleInterface) {}

    async execute(
        id: number,
        cattleData: Partial<Cattle>
    ): Promise<Cattle | null> {

        // Validar los datos de actualización
        const validator = new  ValidatorUpdateCattle (cattleData);
        const validationErrors = await validate(validator);
        
        if (validationErrors.length > 0) {
            throw new Error(JSON.stringify(validationErrors));
        }

        try {
            const updatedCattle = await this.cattleInterface.updateCattleById(id, cattleData);
            return updatedCattle;
        } catch (error) {
            console.error("Error in UpdateCattleByIdUseCase:", error);
            return null;
        }
    }
}
