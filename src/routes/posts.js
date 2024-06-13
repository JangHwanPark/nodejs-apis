import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json({
        "message": "response ok"
    })
})

router.get("/:id", (req, res) => {
    res.status(200).json({
        "message": "response ok"
    })
})

router.get("/limit", (req, res) => {
    res.status(200).json({
        "message": "response ok"
    })
})

router.get("/write", (req, res) => {
    res.status(200).json({
        "message": "response ok"
    })
});

router.put("/edit", (req, res) => {
    res.status(200).json({
        "message": "response ok"
    })
});

router.delete("/delete", (req, res) => {
    res.status(200).json({
        "message": "response ok"
    })
});

export default router;