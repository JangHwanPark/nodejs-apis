// 모듈 임포트
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// 라우터 임포트
import booksRouter from "./routes/products/books.js";
import authRouter from "./routes/auth/auth.js";
import adminRouter from "./routes/users.js";
import coupangRouter from "./routes/products/coupang.js";
import {retryMiddleware, timeoutMiddleware} from "./middlewares/retry.js";

// __dirname 및 __filename 설정
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 서버 설정
const app = express();
dotenv.config();         // 환경변수 읽어오기
app.use(cors());         // 모든 프론트 서버 허용
app.use(express.json()); // JSON 형식의 요청 본문을 파싱

// Index page
app.get("/", (req, res) => {
    const indexPath = path.join(__dirname, "view", "index.html");
    res.sendFile(indexPath, (err) => {
        if (err) res.status(500).send(err);
    });
});

// Router
app.use("/auth", authRouter)
app.use("/books", booksRouter);
app.use("/admin", adminRouter)
app.use("/coupang-products", coupangRouter);

// Timeout
app.use(timeoutMiddleware);
app.use(retryMiddleware);

// 정적파일 적용
app.use(express.static(path.join(__dirname, "view")));

// Start Server
app.listen(process.env.PORT, () => {
    console.log(`서버 시작 Port: ${process.env.PORT}`)
})