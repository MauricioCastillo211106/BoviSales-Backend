import { Cattle } from "../../domain/entity/cattle";
import { CattleInterface } from "../../domain/port/cattleInterface";

export class GetAllCattleUseCase {
    constructor(private readonly cattleInterface: CattleInterface) {}

    async getAll(): Promise<Cattle[] | null> {
        try {
            const listCattle = await this.cattleInterface.getAllCattle();
            return listCattle;
        } catch (error) {
            console.error("Error in GetAllCattleUseCase:", error);
            return null;
        }
    }
}
