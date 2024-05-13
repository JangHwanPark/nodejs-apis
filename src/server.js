// 모듈 임포트
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

// 서버 설정
const app = express();
dotenv.config(); // 환경변수 읽어오기
app.use(cors()); // 모든 프론트 서버 허용

// 서버 시작
app.listen(process.env.PORT, () => {
    console.log(`서버 시작 ${process.env.PORT}`)
})

app.get("/", (req, res) => {
    res.send("나가세요.")
})