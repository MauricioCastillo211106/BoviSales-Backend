import { userInterface } from "../../domain/port/userInterface";
import { validate } from "class-validator";
import { ValidatorId } from "../../domain/validation/user";

export class DeleteUserUseCase {
    constructor(readonly userRepository: userInterface) {}

    async deleteUser(id: string): Promise<string | null> {
        const numericId = parseInt(id, 10);
        console.log(`Parsed ID: ${numericId}`);
        let post = new ValidatorId(numericId);
        const validation = await validate(post);
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }

        try {
            const success = await this.userRepository.deleteUserById(numericId);
            console.log(`Delete success: ${success}`);
            if (success) {
                return "Usuario eliminado correctamente";
            } else {
                return "Usuario no encontrado";
            }
        } catch (error) {
            console.error("Error in DeleteUserUseCase:", error);
            return "Error al eliminar el usuario";
        }
    }
}
