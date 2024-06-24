import { Request, Response } from "express";
import { LoginUserUseCase } from "../../application/useCase/loginUserUseCase";


export class LoginUserController {
    constructor(
        readonly loginUserController: LoginUserUseCase,
        ) {}

    async run(req:Request,res:Response) {
        
        try {
           
            let {email,password} = req.body
    
            let loginUser = await this.loginUserController.run(email, password)

            if (loginUser) {
                return res.status(201).send(
                   loginUser
                )
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