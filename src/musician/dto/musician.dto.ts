import { IsNotEmpty, IsNumber } from "class-validator";

export class MusicianDto{

    @IsNotEmpty()
    name: string;
    
    @IsNotEmpty()
    @IsNumber()
    age: number;
}