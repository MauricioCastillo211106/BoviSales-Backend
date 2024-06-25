import { User } from "../../domain/entity/user";
import { userInterface } from "../../domain/port/userInterface";
import { validate } from "class-validator";
import { ValidateEmail } from "../../domain/validation/user";


export class GetByEmailUseCase{
    constructor( readonly userInterface: userInterface){}

    async get(email: string):Promise <User | null >{

        let post = new ValidateEmail(email)
        const validation = await validate(post)
        console.log(validation.length)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }
        try {
            const result = await this.userInterface.getByEmail(email);
            return result;
        } catch (error) {
            return null;
        }
    }
}