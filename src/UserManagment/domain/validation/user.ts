import { IsString, IsUUID, Length, IsBoolean, IsNotEmpty, ValidateIf, IsIn, IsOptional,IsEmail} from 'class-validator';


export class ValidatorCreateUser {
    
    @IsNotEmpty()
    @IsString()
    @Length(1, 100)
    public name: string;

    @IsNotEmpty()
    @IsEmail()
    public email: string;

    @IsNotEmpty()
    @IsString()
    public password: string;

    @IsNotEmpty()
    @IsString()
    @Length(10) 
    public phone_number: number;

    @IsNotEmpty()
    @IsBoolean()
    public suscription: boolean;

    @IsNotEmpty()
    @IsBoolean()
    public verification: boolean;

    @IsNotEmpty()
    @IsString()
    public image: string;

    constructor(
        name: string,
        email: string,
        password: string,
        phone_number: number,
        suscription : boolean,
        verification: boolean,
        image : string
    ) {
        
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone_number = phone_number;
        this.suscription = suscription;
        this.verification = verification        
        this.image = image;
    }
   
}

export class ValidatorId {
    @IsNotEmpty()
    @IsUUID()
    public uuid: string;
    constructor(uuid:string) {
        this.uuid = uuid
    }
}

export class ValidatorUpdate {
    @IsNotEmpty()
    @IsUUID()
    public uuid: string;

    @IsOptional()
    @IsString()
    @Length(1, 100)
    public name?: string;

    @IsOptional()
    @IsString()
    @Length(1, 100)
    public last_name?: string;

    @IsOptional()
    @IsString()
    @Length(1, 12)
    public nick_name?: string;

    @IsOptional()
    @IsString()
    @Length(10)  
    public phone_number?: string;

    @IsOptional()
    @IsString()
    @Length(1, 100)
    public email?: string;
    constructor( 
        uuid: string,
        name?: string,
        last_name?: string,
        nick_name?:string,
        phone_number?: string,
        email?: string,) {
            
        this.uuid = uuid;
        this.name = name;
        this.last_name = last_name;
        this.nick_name = nick_name;
        this.phone_number = phone_number
        this.email = email;
    }
}

export class ValidatorupdatePassword {

    @IsNotEmpty()
    @IsEmail()
    public email: string;

    @IsNotEmpty()
    @IsString()
    public password: string;

    constructor(
        email: string,
        password: string
    ) {
        this.email = email;
        this.password = password;
    }

}

export class ValidateEmail{
    @IsNotEmpty()
    @IsEmail()
    public email: string;

    constructor(
        email: string
    ) {
        this.email = email;
    }

}
export class ValidateLogin {
    @IsNotEmpty()
    @IsEmail()
    public email: string;

    @IsNotEmpty()
    @IsString()
    public password: string;

    constructor(
        email:string,
        password:string,
    ){
        this.email = email,
        this.password = password
    }
}

