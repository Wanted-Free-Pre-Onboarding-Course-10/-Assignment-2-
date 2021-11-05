import { NotFoundException } from "@nestjs/common";
import { MUSICIAN_NOT_FOUND_EXCEPTON_MSG } from "src/message/messgae";

export class MusicianNotFoundException extends NotFoundException { // nest에서 제공하는 예외 상속 
    constructor(id: string) {
        super(404, MUSICIAN_NOT_FOUND_EXCEPTON_MSG(id))
    }
}