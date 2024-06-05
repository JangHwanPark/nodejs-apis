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

router.put("/post/edit", (req, res) => {
    res.status(200).json({
        "message": "response ok"
    })
});

router.delete("/post/delete", (req, res) => {
    res.status(200).json({
        "message": "response ok"
    })
});

export default router;