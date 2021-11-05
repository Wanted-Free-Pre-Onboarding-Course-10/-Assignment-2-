import { IsEnum, IsNotEmpty, IsNumber } from "class-validator";
import { REQUEST_DTO_GENDER_ENUM_MSG, REQUEST_DTO_NOT_EMPTY_MSG, REQUEST_DTO_NUMBER_MSG } from "../../message/messgae";
import { Gender } from "../gender.enum";

export class CreateMusicianDto{

    @IsNotEmpty({
        message : REQUEST_DTO_NOT_EMPTY_MSG
    })
    name: string;
    
    @IsNotEmpty({
        message : REQUEST_DTO_NOT_EMPTY_MSG
    })
    @IsNumber({},{
        message: REQUEST_DTO_NUMBER_MSG
    })
    age: number;

    @IsEnum(Gender, {
        message : REQUEST_DTO_GENDER_ENUM_MSG
    })
    gender: Gender;
}