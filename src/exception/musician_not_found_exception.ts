import { NotFoundException } from "@nestjs/common";
<<<<<<< HEAD
import { MUSICIAN_NOT_FOUND_EXCEPTON_MSG } from "../message/messgae";
=======
import { MUSICIAN_NOT_FOUND_EXCEPTON_MSG } from "src/message/messgae";
>>>>>>> c86b86f (Feat: Add album service)

export class MusicianNotFoundException extends NotFoundException{ // nest에서 제공하는 예외 상속 
    constructor(id: string){
        super(404, MUSICIAN_NOT_FOUND_EXCEPTON_MSG(id))
    }
}