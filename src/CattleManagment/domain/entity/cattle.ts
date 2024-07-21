import { CattleGender } from "./cattleGender";
import { Breed } from "./breed";

export class Cattle {
    constructor(
        public id: number, 
        public name: string,
        public weight: number,
        public earringNumber: number,
        public age: number,
        public gender: CattleGender,
        public breed: Breed,
        public image: string,
        public id_user: number
    ) {}
}
