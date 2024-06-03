import express from "express";

const router = express.Router();

router.get("/user-info", (req, res) => {
    res.status(200).json({
        "message": "response ok"
    })
});

export default router;