# Node.js EJS 프로젝트

이 프로젝트는 Express.js와 EJS를 사용한 Node.js 웹 서버로, AWS EC2 인스턴스에 배포되었습니다. 이 프로젝트는 도서 관리, 사용자 인증, GitHub API와의 상호작용을 위한 다양한 라우트를 포함하고 있습니다.

## 목차

- [설치](#설치)
- [사용법](#사용법)
- [API 엔드포인트](#api-엔드포인트)
    - [도서](#도서)
    - [인증](#인증)
    - [사용자](#사용자)
    - [GitHub API](#github-api)
- [미들웨어](#미들웨어)
- [환경 변수](#환경-변수)
- [라이센스](#라이센스)

## 설치

1. 리포지토리 클론:
    ```sh
    git clone https://github.com/your-username/your-repo.git
    cd your-repo
    ```

2. 종속성 설치:
    ```sh
    npm install
    ```

3. 루트 디렉토리에 `.env` 파일을 생성하여 환경 변수를 설정:
    ```
    PORT=5000
    JWT_SECRET=your_jwt_secret
    GITHUB_TOKEN=your_github_token
    GITHUB_API=https://api.github.com
    ```

4. 서버 시작:
    ```sh
    npm start
    ```

## 사용법

서버는 `.env` 파일에 지정된 포트에서 시작됩니다. `http://localhost:5000`으로 이동하여 인덱스 페이지에 접근할 수 있습니다.

## API 엔드포인트

### 도서

- **도서 추가**
    - `POST /books/add`
    - 요청 본문: 도서 정보를 포함한 JSON 객체
    - 응답: 새로 생성된 도서 객체

- **모든 도서 가져오기**
    - `GET /books`
    - 응답: 도서 객체 배열

- **특정 도서 가져오기**
    - `GET /books/info/:id`
    - 응답: 도서 객체

- **도서 정보 업데이트**
    - `PUT /books/info/edit/:id`
    - 요청 본문: 업데이트된 도서 정보를 포함한 JSON 객체
    - 응답: 업데이트된 도서 객체

- **도서 삭제**
    - `DELETE /books/delete/:id`
    - 응답: 없음

### 인증

- **사용자 인증**
    - `POST /auth/login`
    - 요청 본문: 사용자 자격 증명을 포함한 JSON 객체
    - 응답: JWT 토큰

### 사용자

- **사용자 관리**
    - `GET /users`
    - 응답: 사용자 객체 배열

### GitHub API

- **리포지토리 정보**
    - `GET /repos/:owner/:repo`
    - 응답: 리포지토리 세부 정보

- **리포지토리 커밋 내역**
    - `GET /repos/:owner/:repo/commit`
    - 응답: 커밋 객체 배열

- **리포지토리 이슈 목록**
    - `GET /repos/:owner/:repo/issue`
    - 응답: 이슈 객체 배열

- **풀 리퀘스트 목록**
    - `GET /repos/:owner/:repo/pulls`
    - 응답: 풀 리퀘스트 객체 배열

- **풀 리퀘스트 커밋 내역**
    - `GET /repos/:owner/:repo/pulls/:pull_number/commit`
    - 응답: 해당 풀 리퀘스트와 관련된 커밋 객체 배열

## 미들웨어

- **Retry 미들웨어**
    - 실패한 요청을 재시도합니다.

- **Timeout 미들웨어**
    - 요청 시간 초과를 처리합니다.

## 환경 변수

프로젝트는 다음과 같은 환경 변수를 사용합니다:

- `PORT`: 서버가 실행될 포트 번호.
- `JWT_SECRET`: JWT 인증을 위한 비밀 키.
- `GITHUB_TOKEN`: GitHub API 인증을 위한 토큰.
- `GITHUB_API`: GitHub API의 기본 URL.

## 라이센스

이 프로젝트는 MIT 라이센스를 따릅니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.