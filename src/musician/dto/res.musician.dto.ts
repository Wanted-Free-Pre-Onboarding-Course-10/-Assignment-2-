import { Gender } from "../gender.enum";

export class ResponseMusicianDto{
    id: string;
    name: string;
    age: number;
    gender: Gender;
    createdAt: number;
    updatedAt: number;

    // == reponse dto 생성 메서드 == //
    public static createResponseMusicianDto( musician : {id : string, name: string, age: number, gender: Gender, createdAt: string, updatedAt: string} ) : ResponseMusicianDto{
        const {id, name, age, gender, createdAt, updatedAt} = musician;

        const responseDto : ResponseMusicianDto = {
            id,
            name,
            age,
            gender,
            createdAt : Date.parse(createdAt),
<<<<<<< HEAD
            updatedAt : updatedAt ? Date.parse(updatedAt) : 0
=======
            updatedAt : Date.parse(updatedAt)
>>>>>>> c86b86f (Feat: Add album service)
        }

        return responseDto
    }
}