

# Assignment 2(마피아 컴퍼니)

## 설명

원티드 프리 온보딩 1주차 기업형 과제([마피아 컴퍼니](http://www.mapiacompany.com/))

본 프로젝트는 원티드x위코드 백엔드 프리온보딩  [마피아 컴퍼니]에서 출제한 과제를 기반으로 제작 되었습니다.

[과제 소개](https://www.notion.so/wecode/Assignment-2-550539c84eee4dc28813a64f12455c48)

## 요구사항 분석

- 앨범 페이지, 뮤지션 페이지, 곡 페이지에 인접 정보들 (ex, 곡의 뮤지션, 곡의 앨범) 을 표현할 수 있도록 **CRUD** API 구성

  - **화면별 Read API 요구사항**

    `곡` 페이지

    - 해당 `곡`이 속한 `앨범`을 가져오는 API
    - 해당 `곡`을 쓴 `뮤지션` 목록을 가져오는 API

    `앨범` 페이지

    - 해당 `앨범`을 쓴 `뮤지션` 목록 가져오는 API
    - 해당 `앨범`의 `곡` 목록을 가져오는 API

    `뮤지션` 페이지

    - 해당 `뮤지션`의 모든 `앨범` API

    - 해당 `뮤지션`의 `곡` 목록 가져오는 API

      

  - Create, Update, Delete API 요구사항

    - `곡` 생성 API

    - `앨범` 생성 API

    - `뮤지션` 생성 API

    - `뮤지션` - `곡` 연결/연결해제 API

    - `곡` - `앨범` 연결/연결해제 API

    - `뮤지션` - `곡` 연결과 `곡` - `앨범` 연결이 되어있으면 GraphDB (neo4j) 에서 `뮤지션` - [*] - `앨범` 연결 여부를 뽑을 수 있습니다. **이 특성을 Read API에서 활용**해주세요.

      

  - Neo4j DB 테이블 요구사항

    - `뮤지션`, `곡`, `앨범`은 각각의 테이블 (musician, song, album)로 구성되어야합니다.
    - `앨범` 안에는 여러 `곡`이 속해있을 수 있습니다.
    - 한 `곡`에는 여러 `뮤지션`이 참여할 수 있습니다.
    - 한 `곡`은 `앨범` 1개에만 들어가있습니다.
    - `뮤지션`은 여러 앨범을 갖고 있을 수 있습니다.
    - `뮤지션`, `앨범`, `곡` 데이터는 위 relation을 테스트할 수 있을만큼 임의로 생성해주시면 좋습니다.

## 과제 구현사항

| 구현사항  | 구현 여부                                          |
| ------ | ----------------------------------------------- |
| 곡 페이지 Read API |  OK| 
| 앨범 페이지 Read API | OK | 
| 뮤지션 페이지 Read API | OK | 
| 곡 CUD API | OK | 
| 앨범 CUD API | OK | 
| 뮤지션 CUD API | OK | 
| 뮤지션 - 곡 연결/연결 해제 API | OK | 
| 뮤지션 - 곡 연결/연결 해제 API | OK| 
| 뮤지션 - 앨범 Read API(뮤지션 - 곡, 곡 - 앨범 활용) | OK |
| 뮤지션, 곡, 앨범 관계 구현 | OK |

## API
[API문서](https://documenter.getpostman.com/view/18238309/UVC3j7da)

## API 테스트
1. 우측 링크를 클릭해서 postman으로 들어갑니다.[링크](https://www.postman.com/martian-satellite-348039/workspace/10-api/overview) 
2. 정의된 server가 올바른지 확인 합니다.()
3. 이후, API 테스트를 시도해 주세요.

## 설치 및 실행 방법
1. 해당 프로젝트를 클론하고, 프로젝트 폴더로 들어갑니다.
```
git clone https://github.com/Wanted-Free-Pre-Onboarding-Course-10/Assignment2.git
cd Assignment2
```
2. 의존성 모듈을 설치합니다.
```
npm install
```
3. 서버를 실행합니다.
```
npm run start
```

## 팀원

| 이름   | github                                          | 담당 역할                  |
| ------ | ----------------------------------------------- | -------------------------- |
| 박지율 | [earthkingman](https://github.com/earthkingman) | Create, Update, Delete API |
| 염재선 | [Yeom Jae Seon](https://github.com/YeomJaeSeon) | Create, Update, Delete API |
| 김태희 | [김태희](https://github.com/godtaehee)          | 화면별 Read API            |
| 박상엽 | [큰형](  https://github.com/lotus0204)          | 화면별 Read API            |

## 개발 일정

![image](https://user-images.githubusercontent.com/48669085/140539886-ceeff85d-68c0-40c6-b71d-262756a5b6e2.png)

## 사전 학습

새로운 기술을 사용하기 전에 서로 다른 주제를 가지고 동료 학습을 진행했습니다.

- [nestJS](https://github.com/Wanted-Free-Pre-Onboarding-Course-10/Assignment2/wiki/Nest-JS-%EA%B0%80%EC%9D%B4%EB%93%9C)
- [nestJS,neo4j,graphDB crud 미니 프로젝트](https://github.com/Wanted-Free-Pre-Onboarding-Course-10/Assignment2/wiki/nestJS,-neo4j,-graphDB-crud-%EB%AF%B8%EB%8B%88-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8)
- [cypher query](https://github.com/Wanted-Free-Pre-Onboarding-Course-10/Assignment2/wiki/cypher-query-%EC%A0%95%EB%A6%AC)
- [Neo4j 관계 설정](https://github.com/Wanted-Free-Pre-Onboarding-Course-10/Assignment2/wiki/Neo4j-%EA%B4%80%EA%B3%84-%EC%84%A4%EC%A0%95)

## 협업 방식

[잡초 협업하기](https://github.com/Wanted-Free-Pre-Onboarding-Course-10/Assignment2/wiki/%ED%98%91%EC%97%85-%EB%B0%A9%EC%8B%9D)

## 개발 과정

**1. 곡, 앨범, 뮤지션 생성 API**
[바로가기](https://github.com/Wanted-Free-Pre-Onboarding-Course-10/Assignment2/wiki/%EA%B3%A1,-%EC%95%A8%EB%B2%94,-%EB%AE%A4%EC%A7%80%EC%85%98-%EC%83%9D%EC%84%B1-API)


**2. 뮤지션 - 곡, 곡 - 앨범 연결/연결해제 API**
[바로가기](https://github.com/Wanted-Free-Pre-Onboarding-Course-10/Assignment2/wiki/%EB%AE%A4%EC%A7%80%EC%85%98---%EA%B3%A1,-%EA%B3%A1---%EC%95%A8%EB%B2%94-%EC%97%B0%EA%B2%B0---%EC%97%B0%EA%B2%B0%ED%95%B4%EC%A0%9C-API)


**3. 곡 페이지**
[바로가기]()

   
**4.뮤지션 페이지**
[바로가기]()

## 회고록

**팀 회고록**
[바로가기](https://github.com/Wanted-Free-Pre-Onboarding-Course-10/Assignment2/wiki/%ED%9A%8C%EA%B3%A0%EB%A1%9D)
