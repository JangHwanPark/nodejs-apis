import express from "express";

const router = express.Router();

// 리포지토리 목록
router.get("/repos/:owner/:repo", (req, res) => {
    res.status(200).json({
        message: "ok"
    })
});

// 커밋 내역
router.get("/repos/:owner/:repo/commit", (req, res) => {
    res.status(200).json({
        message: "ok"
    })
});

// 이슈 리스트
router.get("/repos/:owner/:repo/issue", (req, res) => {
    res.status(200).json({
        message: "ok"
    })
});

// 풀 리퀘스트 정보
router.get("/repos/:owner/:repo/pulls", (req, res) => {
    res.status(200).json({
        message: "ok"
    })
});

// 풀 리퀘스트 커밋 내역
router.get("/repos/:owner/:repo/pulls/:pull-number/commit", (req, res) => {
    res.status(200).json({
        message: "ok"
    })
});

export default router;