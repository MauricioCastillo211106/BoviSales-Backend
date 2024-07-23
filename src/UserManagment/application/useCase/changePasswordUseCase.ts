import { userInterface } from "../../domain/port/userInterface";
import { validate } from "class-validator";
import { ValidatorupdatePassword } from "../../domain/validation/user";
import { compare, hash } from "bcrypt";

export class ChangeUserPasswordUseCase {
    constructor(private readonly userInterface: userInterface) {}

    async execute(email: string, currentPassword: string, newPassword: string): Promise<string | null> {
        let post = new ValidatorupdatePassword(email, newPassword);
        const validation = await validate(post);
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }

        try {
            const user = await this.userInterface.getByEmail(email);
            if (!user) {
                return "Usuario no encontrado";
            }

            const isPasswordValid = await compare(currentPassword, user.password);
            if (!isPasswordValid) {
                return "Contraseña actual incorrecta";
            }

            const hashedNewPassword = await hash(newPassword, 10);
            const isUpdated = await this.userInterface.updatePassword(email, hashedNewPassword);
            if (isUpdated) {
                return "Contraseña actualizada correctamente";
            } else {
                return "Error al actualizar la contraseña";
            }
        } catch (error) {
            console.error("Error in ChangeUserPasswordUseCase:", error);
            return null;
        }
    }
}
