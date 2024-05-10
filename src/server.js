import express from "express";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.listen(process.env.PORT, () => {
    console.log(`서버 시작 ${process.env.PORT}`)
})

app.get("/", (req, res) => {
    res.send("나가세요.")
})