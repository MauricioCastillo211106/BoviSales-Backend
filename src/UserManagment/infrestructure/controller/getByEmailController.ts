import { Request, Response } from "express";
import { GetByEmailUseCase } from "../../application/useCase/getByEmailUseCase";


export class GetByEmailController {
    constructor(readonly getByEmailUseCase: GetByEmailUseCase ,) { }

    async get(req: Request, res: Response) {

        try {

            let {email} = req.body;

            const result = await this.getByEmailUseCase.get(email);

            if (result) {
                return res.status(200).send({
                    status: "succes",
                    data: {
                        user: result
                    }
                })
            } else {
                return res.status(404).send({
                    status: "error",
                    message: "User not found."
                });
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
                message: "An error occurred while get the user."
            });
        }



    }
}