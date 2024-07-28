import { Cattle } from "../../domain/entity/cattle";
import { CattleInterface } from "../../domain/port/cattleInterface";

export class GetCattleByEarringNumberUseCase {
    constructor(private readonly cattleInterface: CattleInterface) {}

    async execute(earringNumber: number): Promise<Cattle | null> {
        return this.cattleInterface.getCattleByEarringNumber(earringNumber);
    }
}
