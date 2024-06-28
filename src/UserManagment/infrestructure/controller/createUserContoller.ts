import { Request, Response } from "express";
import { CreateUserUseCase } from "../../application/useCase/createUserUseCase";
import { UploadedFile } from "express-fileupload";
import uploadToFirebase from "../../../helpers/saveImg";


export class CreateUserController {
    constructor(readonly createUserUseCase: CreateUserUseCase) { }

    async run(req: Request, res: Response) {
        try {

            const { name, email, password , phone_number} = req.body;

            const imgFile = req.files ? req.files.image as UploadedFile : null;
            if (!imgFile) {
                return res.status(400).send({
                    status: "error",
                    message: "No file uploaded."
                });
            }
            const imagenUrl = await uploadToFirebase(imgFile);

            let user= {name, email, password , phone_number, suscription:false, verification:false, image:imagenUrl}
            const createUser = await this.createUserUseCase.run(user);
            

            if (createUser) {
                return res.status(201).send({
                    createUser
                })
            }
            else {
                res.status(404).send({
                    status: "error",
                    data: [],
                    validations: [],
                    message: "Error al crear un usuario, inténtalo más tarde"
                })
            }

        } catch (error) {
            if (error instanceof Error) {

                if (error.message.startsWith('[')) {

                    return res.status(400).send({
                        status: "error",
                        message: "Validation failed",
                        errors: JSON.parse(error.message)
                    });
                }
            }
            return res.status(500).send({
                status: "error",
                message: "An error occurred while adding the book."
            });
        }
    }
}