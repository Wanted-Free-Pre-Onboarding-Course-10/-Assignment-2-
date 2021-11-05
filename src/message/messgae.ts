// == 200 == //
export const DELETE_SUCCESS_MSG = "삭제 성공";
export const CONNECTION_SUCCESS_MSG = "연결 성공";
export const DISCONNECDTION_SUCCESS_MSG = "연결 해제 성공";

// == 400 == //
// == request validation == //
export const REQUEST_DTO_NOT_EMPTY_MSG = "빈 값이면 안됩니다.";
export const REQUEST_DTO_NUMBER_MSG = "정수 값이어야 합니다.";
export const REQUEST_DTO_GENDER_ENUM_MSG =
  "MALE, FEMALE 둘중 하나를 입력해야 합니다.";

// == 404 == //
export const MUSICIAN_NOT_FOUND_EXCEPTON_MSG = (id: string) =>
  `${id}의 Musician이 없습니다.`;
export const REQUEST_DTO_GENRE_ENUM_MSG =
  "DANCE, BALAD, HIPHOP, POP, TROT, SOUL 중 하나를 입력해야 합니다.";

// == 404 == //
export const ALBUM_NOT_FOUND_EXCEPTON_MSG = (id: string) =>
  `${id}의 Album이 없습니다.`;

export const CONN_FAIL_EXCEPTION_MSG = "연결 할 두 데이터중 하나가 존재하지 않습니다."

export const CONN_ERR_EXCEPTION_MSG = "이미 연결 관계가 존재합니다.";

export const DISCON_ERR_EXCEPTION_MSG = "해제할 관계가 없습니다.";
