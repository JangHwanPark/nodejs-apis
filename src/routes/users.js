import express from "express";
import {
    createUser,
    deleteUserById,
    findUserById,
    findUserCount,
    getAllUsers,
    updateUser
} from "../controllers/userControllers.js";

const router = express.Router();
router.post("/user/create", createUser);
router.get("/get/all", getAllUsers);
router.get("/user/:uid", findUserById);
router.get('/count', findUserCount);
router.post("/user/update/:uid", updateUser);
router.delete("/user/:uid", deleteUserById);


export default router;