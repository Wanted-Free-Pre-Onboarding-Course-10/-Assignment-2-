import { NotFoundException } from "@nestjs/common";
import { ALBUM_NOT_FOUND_EXCEPTON_MSG, CONN_FAIL_EXCEPTION_MSG, DISCON_ERR_EXCEPTION_MSG } from "../message/messgae";

export class DisconnectException extends NotFoundException { // nest에서 제공하는 예외 상속 
    constructor() {
        super(404, DISCON_ERR_EXCEPTION_MSG)
    }
}