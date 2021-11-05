export class ResponseSongDto{
    id: string;
    name: string;
    createdAt: number;
    updatedAt: number;

        // == reponse dto 생성 메서드 == //
        public static createResponseSongDto( song : {id : string, name: string, createdAt: string, updatedAt: string} ) : ResponseSongDto{
            const {id, name, createdAt, updatedAt} = song;
    
            const responseDto : ResponseSongDto = {
                id,
                name,
                createdAt : Date.parse(createdAt),
                updatedAt : updatedAt ? Date.parse(updatedAt) : 0
            }
    
            return responseDto
        }
}