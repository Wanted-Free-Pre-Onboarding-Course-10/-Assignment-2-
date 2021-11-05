import { IsNotEmpty } from "class-validator";
import { REQUEST_DTO_NOT_EMPTY_MSG } from "../../message/messgae";

export class RequestSongDto{
    @IsNotEmpty({
        message : REQUEST_DTO_NOT_EMPTY_MSG
    })
    name: string;   
}