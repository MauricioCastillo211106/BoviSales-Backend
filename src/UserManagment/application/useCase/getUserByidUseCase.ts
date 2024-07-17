import { userInterface } from "../../domain/port/userInterface";
import { User } from "../../domain/entity/user";

export class GetUserByIdUseCase {
    getId(arg0: string) {
        throw new Error("Method not implemented.");
    }
    constructor(private readonly userInterface: userInterface) {}

    async execute(id: string): Promise<User | null> {
        try {
            return await this.userInterface.getUserById(id);
        } catch (error) {
            console.error("Error in GetUserByIdUseCase:", error);
            return null;
        }
    }
}
