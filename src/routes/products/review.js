import express from "express";
import {getAllBookReview} from "~/controllers/reviewControllers.js";

const router = express.Router();
router.get("/book", getAllBookReview)