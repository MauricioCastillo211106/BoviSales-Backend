import { CattleInterface } from "../../domain/port/cattleInterface";

export class DeleteCattleByIdUseCase {
    constructor(private readonly cattleInterface: CattleInterface) {}

    async execute(id: number): Promise<string | null> {
        try {
            const isDeleted = await this.cattleInterface.deleteCattleById(id);
            return isDeleted;
        } catch (error) {
            console.error("Error in DeleteCattleByIdUseCase:", error);
            return null;
        }
    }
}
