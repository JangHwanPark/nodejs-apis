import express from "express";
import {registerUser, signIn, signOut} from "../../controllers/authController.js";

const router = express.Router();
router.post("/login", signIn);
router.post("/logout", signOut);
router.post("/register", registerUser);

export default router;