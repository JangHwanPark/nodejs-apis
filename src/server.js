const express = require("express");
const app = (express);

app.listen(process.env.PORT, () => {
    console.log("서버 시작")
})

app.get("/", (req, res) => {
    res.send("나가세요.")
})