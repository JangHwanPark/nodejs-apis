import express from "express";
import {signIn, signOut} from "../../controllers/auth/authControllers.js";
import {registerUser} from "../../controllers/auth/registerController.js";

const router = express.Router();
router.post("/login", signIn);
router.post("/logout", signOut);
router.post("/register", registerUser);

export default router;