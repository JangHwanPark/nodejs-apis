import express from "express";
import {signIn, signOut} from "../../controllers/authController.js";

const router = express.Router();
router.post("/login", signIn);
router.post("/logout", signOut);

export default router;