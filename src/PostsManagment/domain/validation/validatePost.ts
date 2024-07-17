import { IsNotEmpty, IsString, IsNumber, IsEnum, IsDate } from "class-validator";
import { Status } from "../entity/status";

export class ValidatePost {
    @IsNotEmpty()
    @IsString()
    idCattle: number;

    @IsNotEmpty()
    @IsString()
    idUser: number;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsNumber()
    precio: number;

    @IsNotEmpty()
    @IsString()
    ubicacion: string;

    @IsNotEmpty()
    @IsDate()
    fecha: Date;

    @IsNotEmpty()
    @IsEnum(Status)
    status: Status;

    constructor(idCattle: number, idUser: number, description: string, precio: number, ubicacion: string, fecha: Date, status: Status) {
        this.idCattle = idCattle;
        this.idUser = idUser;
        this.description = description;
        this.precio = precio;
        this.ubicacion = ubicacion;
        this.fecha = fecha;
        this.status = status;
    }
}
