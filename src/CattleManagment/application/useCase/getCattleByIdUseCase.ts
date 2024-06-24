import { Cattle } from "../../domain/entity/cattle";
import { CattleInterface } from "../../domain/port/cattleInterface";

export class GetCattleByIdUseCase {
    constructor(private readonly cattleInterface: CattleInterface) {}

    async execute(id: number): Promise<Cattle | null> {
        try {
            const cattle = await this.cattleInterface.getCattleById(id);
            return cattle;
        } catch (error) {
            console.error("Error in GetCattleByIdUseCase:", error);
            return null;
        }
    }
}
