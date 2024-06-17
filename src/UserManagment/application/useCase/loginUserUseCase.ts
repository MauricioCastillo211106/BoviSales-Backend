import { validate } from "class-validator";
import { User, Userlogin } from "../../domain/entity/user";
import { userInterface } from "../../domain/port/userInterface";
import { ValidateLogin } from "../../domain/validation/user";


export class LoginUserUseCase {
    constructor(readonly userInterface: userInterface) { }

    async run(email: string, password: string): Promise<Userlogin | null | string> {
        //validator-class
        let post = new ValidateLogin(email, password)
        const validation = await validate(post)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }

        try {
            const loginUser = await this.userInterface.loginUser(email, password)
            return loginUser;
        } catch (error) {
            return null;
        }
    }
}