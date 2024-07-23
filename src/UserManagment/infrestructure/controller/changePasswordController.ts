import { Request, Response } from "express";
import { ChangeUserPasswordUseCase } from "../../application/useCase/changePasswordUseCase";

export class ChangeUserPasswordController {
    constructor(private readonly changeUserPasswordUseCase: ChangeUserPasswordUseCase) {}

    async run(req: Request, res: Response) {
        try {
            const { email } = req.body;
            const { currentPassword, newPassword } = req.body;

            if (!email || !currentPassword || !newPassword) {
                return res.status(400).send({
                    status: "error",
                    message: "Todos los campos son obligatorios"
                });
            }

            const result = await this.changeUserPasswordUseCase.execute(email, currentPassword, newPassword);

            if (result === "Contraseña actualizada correctamente") {
                return res.status(200).send({
                    status: "success",
                    message: result
                });
            } else {
                return res.status(400).send({
                    status: "error",
                    message: result
                });
            }
        } catch (error) {
            console.error("Error in ChangeUserPasswordController:", error);
            return res.status(500).send({
                status: "error",
                message: "Ocurrió un error al cambiar la contraseña"
            });
        }
    }
}
