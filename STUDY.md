# Nest Js

## 참고 사이트
https://www.inflearn.com/course/%EB%94%B0%EB%9D%BC%ED%95%98%EB%8A%94-%EB%84%A4%EC%8A%A4%ED%8A%B8-%EC%A0%9C%EC%9D%B4%EC%97%90%EC%8A%A4/dashboard


### Module
- @Module() 데코레이터로 주석이 달린 클래스
- 각 응용프로그램에는 하나이상의 루트모듈이 필요
- 기능별로 모듈을 만드는것이 효과적
- 같은 기능에 해당하는 것들은 하나에 모듈 폴더안에 넣어서 사용함
- ex)UserController, UserService, UserEntity전부 같은 기능이기에 UserModule에 넣어서 사용
```
nest g module board //CLI로 board 모듈 생성 가능
```

### Controller
- 들어오은 요청을 처리하고 클라이언트에 응답을 반환
- @Controller 데코레이터로 클래스를 데코레이션하여 정의
- 데코레이터는 
 - <b>Handler</b>
    - 핸들러는 @Get, @Post, @Patch, @Delete 등과 같은 데코레이터를 장식된 컨트롤러 내의 메소드

```
nest g controller boards --no-spec
* --no-spec: 테스트를 위한 소스코드 생성 하지않음
```

### Service
- 소프트웨어 개발내의 공통개념
- @Injectable 데코레이터로 다른 컴포넌트에서도 이 서비스를 사용 할 수 있게 해줌
- 컨트롤러의 유효성체크, DB아이템생성 등 비즈니스 로직 처리
```
nest g service boards --no-spec
```
```TS
//접근 제한자를 이용해서 소스 간단하게 하기
@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}
}
```
```JS
@Controller('boards')
export class BoardsController {

  boardsService: BoardsService

  constructor(boardsService: BoardsService) {
    this.boardsService = boardsService
  }
}
```

### Providers
- nest의 기본개념
- Nest기본 클래스는 서비스,리포지토리,팩토리,핼퍼등 프로바이더로 취급
- 프로바이더의 주요 아디이너는 종속석으로 주입할 수 있다는 것임
- 객체는 서로 다양한 관계를 만들 수 있고 객체의 인스턴스를 연결하는 기능은 대부분 Nest 런타임 시스템에 위임 될 수 있음
- 사용하기 위한 Nest에 등록해야함
- 등록하는방법은 module파일에서 가능

### Model
- Model을 정의할때는 interface, class로 정의 가능
- interface 변수의 타입만을 체크
- classes 변수 타입체크, 인스턴스 또한 생성가능


```ts
  /*
    타입을 정의는 선택사항이지만
    타입을 미리 정의함으로써 에러를 방지 가능
  */

  getAllboards(): Board[] {
    return this.boards
  }
  
```

### DTO
- 계층간 데이터 교환를 위한 객체
- 데이터가 네트워크를 통해 전송되는 방법을 정의하는 객체
- interface, class를 이용해서 정의 될 수 있음 (NestJs에선 Class이용하는것을 추천)
- 데이터 유효성을 체크하는데 효율적, 안정적인 코드로 만들어줌, 유지보수 용이

```JS
  const title = createBoardDto.title
  const description = createBoardDto.description

  //아래 선언으로 대체 가능
  const {
    title,
    description
  } = createBoardDto
```
### NestJs Pipes

1. Pipe?
- @Injectable() 데코레이터로 주석이 달린 클래스
- 파이프는 data transformation과 date validation을 위해서 사용
- 파이프는 컨트롤러 경로 처리기에 의해 처리되는 인수에 대해 작동
- Nest는 메소드가 호출되기 직전에 파이프를 삽입하고 파이프는 메소드로 향하는 인수를 수신하고 이에 대해 작동함

    1.data transformation
    - 입력 데이터를 원하는 형식으로 변환 (ex string -> number)
    - 만약 숫자를 받기 원하는데 문자열 형식으로 온다면 파이프에서 자동으로 숫자로 바꿔줌

    2.data validation
      - 유효성검사

- 파이프는 위 두가지 모든 경우에 대해 라우트 핸들러가 처리하는 인수에 대해서 작동

- PIPI사용법 (Binding Pipes)
    1. Handler-level
        - @UsePipes() 데코레이터를 이용해서 사용 할 수 있음
        - 핸들러의 파라미터 모두에게 적용

    2. Paramater-level
        - 특정한 파라미터에게 적용이 되는 파이프

    3. Global-level
        - application전체 클라이언트 에서 요청하는 모든
        - app.useGlobalPipes(GlobalPipes) 정의 가능

    * Nest JS에 기본적으로 사용할 수 있게 만들어 놓은 6개의 파이프가 있음
      1. ValidationPipe
      1. ParseIntPipe
      1. ParseBoolPipe
      1. ParseArrayPipe
      1. ParseUUIDPipe
      1. DefaultValuePipe

      ```ts
      //ValidationPipe 는 from '@nestjs/common'에 있음
      @Post()
      @UsePipes(ValidationPipe)
      createBoard(
      @Body() createdBoardDto: CreateBoardDto
      ): Board {
        return this.boardsSerivce.createBoard(createdBoardDto)
      }

      //ParseIntPipe사용
      @Delete('/:id')
      async deleteBoard(@Param('id', ParseIntPipe) id): Promise<void> {
        return this.boardService.deleteBoard(id)
      }
      ```
      
      ```js
      import { IsNotEmpty } from "class-validator"
      export class CreateBoardDto {
        IsNotEmpty()
        title: string

        @IsNotEmpty()
        description: string
      }
      ```

2. CustomPipe
    - PipeTransform 인터페이스를 새롭게 만들 커스텀 파이프에 구현해줘야 함
    - transform() 메소드를 필요로함
    - 이메소드는 NestJs가 인자 2개
    - transform()메소드 return된 값은 Route핸들러에 전해짐
      Exception가 발생하면 클라이언트에 바로 보내짐


### TypeORM

    - node.js에서 실행되고 TypeScript로 작성된 객체 관계형 매퍼 라이브러리
    - typeORM은 MySQL, PostgreSQL, MariaDB, SQLite, MS SQL Server
      Oracle, SAP Hana 및 WebSQL과 같은 여러 데이터 베이스를 지원함

    1. ORM(Object Relational Mapping)
      - 객체와 관계형 데이터베이스의 데이터를 자동으로 변형 및 연결하는 작업
      - ORM을 이용한 개발은 객체와 데이터베이스의 변형에 유연하게 사용 할 수 있음

    1. 특징
      - 모델을 기반으로 데이터베이스 테이블 체계를 자동으로 생성
      - 일대일, 일일대 다 및 다대다를 만들 수 있음
      - 간단한 CLI명령을 제공

    1. @nests/TypeORM
      - NestJs에서 TypeOrm을 사용하기 위해 연동시켜주는 모듈

### Entity


### Repository
    - 엔티티 개체와 함께 작동하며 찾기 삽입 업데이트 삭제 등을 처리
    - 데이터베이스 관련된 일을 Repository에서 처리 (Service X)

### remove() vs delete()?

 - remove : 무조건 존재하는 아이템을 remove 메소드를 이용해서 지워야함 그러지않으면 Error
 - delete : 만약 아이템이 존재하면 지우고 존재하지 않으면 아무런 영향이 없음

 - remove를 이용하면 하나의 아이템을 지울때 두번 데이터베이스 호출?이용? 하기때문에 
   1번만 작업이 필요한 delete 이용 remove를 사용해야 될때는 remove 이용할것

### 중복체크 방법
  1. entity에서 원하는 필드를 유니크로 지정/ 같은 이름을 가진 유저가 있다면 에러뱉음
  1. repository에서 쿼리 2번으로 확인
  ```JS
    @Entity()
    //배열로 들어가기 때문에 여러개의 값 선언 가능
    @Unique(['username'])
    export class User extends BaseEntity {
      ...
    }
    //이렇게 하면 아래와 같이 나옴 원하는 message로 변경 가능
    /* 
      statusCode : 500
      message : Error Internal server error
    */
  ```





