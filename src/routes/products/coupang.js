import express from "express";
import {addProduct, deleteProduct, getAllProducts, getProductByCategory} from "../../controllers/productControllers.js";

/* Route 는 경로 정의및 경로에서 실행할 컨트롤러를 지정한다. */
const router = express.Router();
router.post("/add", addProduct);
router.get("/v1/get/all", getAllProducts);
router.get("/v1/get/:category", getProductByCategory);
router.delete("/delete/:pid", deleteProduct);
export default router;