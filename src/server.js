// 모듈 임포트
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// 서버 설정
const app = express();
dotenv.config();


// 서버 시작
app.listen(process.env.PORT, () => {
    console.log(`서버 시작 ${process.env.PORT}`)
})

app.get("/", (req, res) => {
    res.send("나가세요.")
})