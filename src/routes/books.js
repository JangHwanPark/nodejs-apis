import express from "express";

const router = express.Router();
router.get("/books", (req, res) => {
    res.status(200).json({
        "message": "response ok"
    });
});

router.get("/books/info", (req, res) => {
    res.status(200).json({
        "message": "response ok"
    });
});

router.get("/book/info/:id/edit", (req, res) => {
    res.status(200).json({
        "message": "response ok"
    });
});

router.get("/book/info/:id/delete", (req, res) => {
    res.status(200).json({
        "message": "response ok"
    });
});
router.get("/book/info/add", (req, res) => {
    res.status(200).json({
        "message": "response ok"
    });
});

export { router }