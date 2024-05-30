import express from "express";
const router = express.Router();

router.get("/login", (req, res) => {
    res.status(200).json({
        "message": "response ok"
    })
});

router.get("/register", (req, res) => {
    res.status(200).json({
        "message": "response ok"
    });
});

router.get("/logout", (req, res) => {
    res.status(200).json({
        "message": "response ok"
    });
})

export default router;