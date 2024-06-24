import { IsOptional, IsString, IsNumber, Min, IsEnum, IsUrl } from "class-validator";
import { CattleGender } from "../entity/cattleGender";
import { Breed } from "../entity/breed";
import { Cattle } from "../entity/cattle";

export class ValidatorUpdateCattle {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsNumber()
    @Min(1)
    weight?: number;

    @IsOptional()
    @IsNumber()
    @Min(1)
    earringNumber?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    age?: number;

    @IsOptional()
    @IsEnum(CattleGender, { message: `gender must be one of the following values: ${Object.values(CattleGender).join(', ')}` })
    gender?: CattleGender;

    @IsOptional()
    @IsEnum(Breed, { message: `breed must be one of the following values: ${Object.values(Breed).join(', ')}` })
    breed?: Breed;

    @IsOptional()
    @IsUrl()
    image?: string;

    constructor(cattleData: Partial<Cattle>) {
        Object.assign(this, cattleData);
    }
}
