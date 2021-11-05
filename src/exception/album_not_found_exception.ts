import { NotFoundException } from "@nestjs/common";
import { ALBUM_NOT_FOUND_EXCEPTON_MSG } from "../message/messgae";

export class AlbumNotFoundException extends NotFoundException { // nest에서 제공하는 예외 상속 
    constructor(id: string) {
        super(404, ALBUM_NOT_FOUND_EXCEPTON_MSG(id))
    }
}