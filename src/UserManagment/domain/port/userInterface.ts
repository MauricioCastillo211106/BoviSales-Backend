import { User } from "../entity/user";


export interface userInterface{
    createUser(user:User):Promise<User | null>;


}