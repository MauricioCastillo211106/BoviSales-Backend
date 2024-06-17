import { User } from "../../domain/entity/user";
import { userInterface } from "../../domain/port/userInterface";

export class CreateUserUseCase{
    constructor( readonly userinterface:userInterface){}

    async run(user:any):Promise<User | null>{
        try {
            let Create=new User(user.name,user.email,user.password,user.phone_number,user.suscription,user.verification,user.image)
            const createUser = await this.userinterface.createUser(Create);
            return createUser;
        } catch (error) {
            return null;
        }
    }
}