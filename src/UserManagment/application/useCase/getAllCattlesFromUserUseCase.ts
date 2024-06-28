import { userInterface } from "../../domain/port/userInterface";
import { Cattle } from "../../../CattleManagment/domain/entity/cattle";

export class GetCattleByUserUseCase {
    constructor(private userRepository: userInterface) {}

    async run(userId: string): Promise<Cattle[] | null> {
        try {
            return await this.userRepository.getAllCattlesFromUser(userId);
        } catch (error) {
            return null
        }
        
    }
}
