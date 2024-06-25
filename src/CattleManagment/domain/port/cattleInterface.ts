import { Cattle } from "../entity/cattle";

export interface CattleInterface {
    createCattle(cattle: Cattle): Promise<Cattle|null>;
    getAllCattle(): Promise<Cattle[] | null>
    getCattleById(id: number): Promise<Cattle | null>;
    deleteCattleById(id: number): Promise<string | null>;
    updateCattleById(id: number, cattleData: Partial<Cattle>): Promise<Cattle | null>;
}
