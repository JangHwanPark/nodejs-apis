// 모듈 임포트
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

// 서버 설정
export const app = express();
dotenv.config(); // 환경변수 읽어오기
app.use(cors()); // 모든 프론트 서버 허용

// 서버 시작
app.listen(process.env.PORT, () => {
    console.log(`서버 시작 Port: ${process.env.PORT}`)
})

// Index page
app.get("/", (req, res) => {
    res.send("나가세요.")
})

// Books
app.get("/api/get/books", (req, res) => {
    res.status(200).json({
        "message": "response ok"
    });
});

app.post("/api/post/book-info", (req, res) => {
    res.status(200).json({
        "message": "response ok"
    });
});

app.get("/api/get/book-info/add", (req, res) => {
    res.status(200).json({
        "message": "response ok"
    });
});

app.get("/api/get/book-info/:id/edit", (req, res) => {
    res.status(200).json({
        "message": "response ok"
    });
});

app.get("/api/get/book-info/:id/delete", (req, res) => {
    res.status(200).json({
        "message": "response ok"
    });
});

// Auth (login / register)
app.get("/api/get/auth/login", (req, res) => {
    res.status(200).json({
        "message": "response ok"
    })
});

app.get("/api/get/auth/register", (req, res) => {
    res.status(200).json({
        "message": "response ok"
    });
});

app.get("api/get/auth/logout", (req, res) => {
    res.status(200).json({
        "message": "response ok"
    });
})

// admin
app.get("/api/get/admin/user-info", (req, res) => {
    res.status(200).json({
        "message": "response ok"
    })
})

// Blog
app.get("/api/get/blog/posts", (req, res) => {
    res.status(200).json({
        "message": "response ok"
    })
})

app.get("api/get/blog/post/write", (req, res) => {
    res.status(200).json({
        "message": "response ok"
    })
});

app.get("api/get/blog/post/edit", (req, res) => {
    res.status(200).json({
        "message": "response ok"
    })
});

app.get("api/get/blog/post/delete", (req, res) => {
    res.status(200).json({
        "message": "response ok"
    })
});