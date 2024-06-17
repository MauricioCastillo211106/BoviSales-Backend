import { User, Userlogin } from "../entity/user";


export interface userInterface{
    createUser(user:User):Promise<User | null>;
    loginUser(email:string, password:string):Promise<Userlogin| null | string> 

}