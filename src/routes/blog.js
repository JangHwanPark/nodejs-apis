import express from "express";

const router = express.Router();

router.get("/posts", (req, res) => {
    res.status(200).json({
        "message": "response ok"
    })
})

router.get("/post/write", (req, res) => {
    res.status(200).json({
        "message": "response ok"
    })
});

router.get("/post/edit", (req, res) => {
    res.status(200).json({
        "message": "response ok"
    })
});

router.get("/post/delete", (req, res) => {
    res.status(200).json({
        "message": "response ok"
    })
});

export default router;