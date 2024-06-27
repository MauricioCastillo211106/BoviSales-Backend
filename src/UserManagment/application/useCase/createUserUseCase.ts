import { User } from "../../domain/entity/user";
import { userInterface } from "../../domain/port/userInterface";
import { encrypt } from "../../../helpers/ashs";
import { ValidatorCreateUser } from "../../domain/validation/user";
import { validate } from "class-validator";

export class CreateUserUseCase{
    constructor( readonly userinterface:userInterface){}

    async run(user:any):Promise<User | null>{

        console.log(user.image," asdas")
        //validator-class
        let post = new ValidatorCreateUser(user.name,user.email,user.password,user.phone_number,user.suscription,user.verification,user.image);
        const validation = await validate(post)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }
        let passwordHash = await encrypt (user.password)
        try {
            let Create=new User(user.name,user.email,passwordHash,user.phone_number,user.suscription,user.verification,user.image)
            const createUser = await this.userinterface.createUser(Create);
            return createUser;
        } catch (error) {
            return null;
        }
    }
}