// 모듈 임포트
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

// 라우터 임포트
import booksRouter from "./routes/api/products/books.js";
import authRouter from "./routes/api/auth/auth.js";
import adminRouter from "./routes/api/admin/admin.js";
import blogRouter from "./routes/posts.js";

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
console.log(booksRouter instanceof express.Router);
app.use("/books", booksRouter);

// Auth (login / register)
app.use("/auth", authRouter)

// admin
app.use("/admin", adminRouter)

// Blog
app.use("/blog", blogRouter)

// 자동입력 방지 보안 이미지 생성

// 미들웨어
// app.use(errorHandler)