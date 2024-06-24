import { CattleGender } from "./cattleGender";
import { Breed } from "./breed";

export class Cattle {
    constructor(
        readonly name:string,
        readonly weight: number,
        readonly earringNumber: number,
        readonly age: number ,
        readonly gender : CattleGender,
        readonly breed : Breed,
        readonly image : string
    ){}
 
}