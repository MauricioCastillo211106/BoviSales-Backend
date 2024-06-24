import { IsNotEmpty, IsString, IsNumber, Min, IsEnum, IsUrl } from "class-validator";
import { CattleGender } from "../../domain/entity/cattleGender";
import { Breed } from "../../domain/entity/breed";

export class CattleValidator {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    weight: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    earringNumber: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    age: number;

    @IsNotEmpty()
    @IsEnum(CattleGender, { message: `gender must be one of the following values: ${Object.values(CattleGender).join(', ')}` })
    gender: CattleGender;

    @IsNotEmpty()
    @IsEnum(Breed, { message: `breed must be one of the following values: ${Object.values(Breed).join(', ')}` })
    breed: Breed;

    @IsNotEmpty()
    @IsUrl()
    image: string;

    constructor(
        name: string,
        weight: number,
        earringNumber: number,
        age: number,
        gender: CattleGender,
        breed: Breed,
        image: string
    ) {
        this.name = name;
        this.weight = weight;
        this.earringNumber = earringNumber;
        this.age = age;
        this.gender = gender;
        this.breed = breed;
        this.image = image;
    }

    
}
