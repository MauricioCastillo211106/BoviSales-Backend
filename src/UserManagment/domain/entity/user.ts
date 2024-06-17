export class User {
    constructor(
        readonly name:string,
        readonly email:string,
        readonly password: string,
        readonly phone_number: number,
        readonly suscription : boolean,
        readonly verification: boolean,
        readonly image : string
    ){}

}