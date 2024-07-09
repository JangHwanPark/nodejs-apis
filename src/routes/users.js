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
router.get("/v1/get/all", getAllUsers);
router.get("/v1/get/user/:uid", findUserById);
router.get('/count', findUserCount);
router.post("/user/update/:uid", updateUser);
router.delete("/user/:uid", deleteUserById);
router.delete("/", deleteUserById);


export default router;