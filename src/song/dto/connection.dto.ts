import { IsNotEmpty } from "class-validator";


export class ConnectionDto{
    @IsNotEmpty()
    start: string;
    @IsNotEmpty()
    end: string
}