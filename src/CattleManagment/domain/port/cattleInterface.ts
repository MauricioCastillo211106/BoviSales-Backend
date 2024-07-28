import { Cattle } from "../entity/cattle";

export interface CattleInterface {
    createCattle(cattle: Cattle): Promise<Cattle|null |string>;
    getAllCattle(): Promise<Cattle[] | null>
    getCattleById(id: number): Promise<Cattle | null>;
    deleteCattleById(id: number): Promise<string | null>;
    updateCattleById(id: number, cattleData: Partial<Cattle>): Promise<Cattle | null>;
    getCattleByBreed(breed: string): Promise<Cattle[]>;
}
