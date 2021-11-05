import { NotFoundException } from "@nestjs/common";
import { CONN_ERR_EXCEPTION_MSG } from "../message/messgae";

export class ConnectionException extends NotFoundException { // nest에서 제공하는 예외 상속 
    constructor() {
        super(404, CONN_ERR_EXCEPTION_MSG)
    }
}