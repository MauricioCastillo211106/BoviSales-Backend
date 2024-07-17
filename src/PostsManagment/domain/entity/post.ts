import { Status } from "./status";
export class Post{
    constructor(
        public idCattle: number,
        public idUser: number,
        public description: string,
        public precio: number,
        public ubicacion: string,
        public fecha: Date,
        public status: Status,
    ){}
}