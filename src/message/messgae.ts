// == 200 == //
export const DELETE_SUCCESS_MSG = "삭제 성공";


// == 400 == //
// == request validation == //
export const REQUEST_DTO_NOT_EMPTY_MSG = '빈 값이면 안됩니다.';
export const REQUEST_DTO_NUMBER_MSG = "정수 값이어야 합니다.";
export const REQUEST_DTO_GENDER_ENUM_MSG = "MALE, FEMALE 둘중 하나를 입력해야 합니다.";
<<<<<<< HEAD

// == 404 == //
export const MUSICIAN_NOT_FOUND_EXCEPTON_MSG = (id: string) => `${id}의 Musician이 없습니다.`
=======
export const REQUEST_DTO_GENRE_ENUM_MSG = "DANCE, BALAD, HIPHOP, POP, TROT, SOUL 중 하나를 입력해야 합니다."
export const REQUEST_DTO_DATE_MSG = "정확한 형식의 날짜를 입력해야 합니다. 예)20211022";

// == 404 == //
export const MUSICIAN_NOT_FOUND_EXCEPTON_MSG = (id: string) => `${id}의 Musician이 없습니다.`
export const ALBUM_NOT_FOUND_EXCEPTON_MSG = (id: string) => `${id}의 Album이 없습니다.`
>>>>>>> c86b86f (Feat: Add album service)
