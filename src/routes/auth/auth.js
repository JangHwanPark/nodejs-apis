import express from "express";
import {signIn, signOut} from "../../controllers/auth/LoginControllers.js";
import {registerUserControllers} from "../../controllers/auth/registerController.js";

const router = express.Router();
router.post("/login", signIn);
router.post("/logout", signOut);
router.post("/register", registerUserControllers);

export default router;