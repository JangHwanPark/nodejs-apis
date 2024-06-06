// 모듈 임포트
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// 라우터 임포트
import booksRouter from "./routes/products/books.js";
import signInRouter from "./routes/auth/login.js";
import signUpRouter from "./routes/auth/register.js";
import adminRouter from "./routes/admin.js";
import blogRouter from "./routes/posts.js";
import githubRouter from "./routes/github/issue.js";

// 미들웨어 임포트
import errorHandler from "./middlewares/errorHandler.js";

// 서버 설정
const app = express();
dotenv.config();         // 환경변수 읽어오기
app.use(cors());         // 모든 프론트 서버 허용
app.use(express.json()); // JSON 형식의 요청 본문을 파싱

// 서버 시작
app.listen(process.env.PORT, () => {
    console.log(`서버 시작 Port: ${process.env.PORT}`)
})

// Index page
app.get("/", (req, res) => {
    res.send("나가세요.")
})

// Books
const log = "booksRouter instanceof express.Router";
console.log(`${log}: ${booksRouter instanceof express.Router}`);
app.use("/books", booksRouter);

// Auth (login / register)
app.use("/auth", signInRouter)
app.use("/auth", signUpRouter)

// admin
app.use("/admin", adminRouter)

// Posts
app.use("/post", blogRouter)

// GitHub
app.use("/github", githubRouter)

// 에러 핸들링 미들웨어
app.use(errorHandler);