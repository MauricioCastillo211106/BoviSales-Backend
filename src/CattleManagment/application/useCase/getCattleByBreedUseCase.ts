import { Cattle } from "../../domain/entity/cattle";
import { CattleInterface } from "../../domain/port/cattleInterface";

export class GetCattleByBreedUseCase {
    constructor(private readonly cattleInterface: CattleInterface) {}

    async execute(breed: string): Promise<Cattle[]> {
        return this.cattleInterface.getCattleByBreed(breed);
    }
}
