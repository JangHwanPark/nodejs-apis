import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// 공통 에러 처리 함수
const handleCommonError = (res, errorCode, errorMessage, description) => {
    res.status(500).json({
        errorCode,
        errorMessage,
        description
    });
};

/* 쿠팡 제품 생성(coupang_products/add) */
// URL: http://localhost:포트번호/coupang_products/add
// Method: POST
router.post("/add", async (req, res) => {
    const { pid, category, name, base_price, price, unit_price, arrival, rating, reward, url } = req.body;

    try {
        // prisma로 coupang_products 생성 
        const product = await prisma.coupang_products.create({
            data: {pid : parseInt(pid), category, name, base_price, price, unit_price, arrival, rating, reward, url }
            // coupang_products의 모든 필드를 입력하여 생성, pid는 문자열로 받아오니 정수로 변환한다. 
        });
        res.status(201).json(product); // 제품이 생성되었음을 Client에 res
        console.log("ok"); 
    } catch (error) { // 생성된 이외의 예외 처리
        console.error(error);
        handleCommonError(res, 900, "Unexpected Error", "Failed to create product");
    }
});

/* 쿠팡 제품 조회(coupang_products/카테고리)) */
// URL: http://localhost:5000/coupang_products/:(카테고리)
// Method: GET
router.get("/:category", async (req, res) => {
    const { category } = req.params;

    try { // 카테고리로 제품 찾기
        const products = await prisma.coupang_products.findMany({
            where: { category }
        });
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        handleCommonError(res, 900, "Unexpected Error", "Failed to fetch products");
    }
});

// TODO 쿠팡 제품 수정
router.post("/update/:pid", async (req, res) => {
    const { pid } = req.params;
    const { category, name, base_price, price, unit_price, arrival, rating, reward, url } = req.body;

    try {
        // 새로운 제품 추가

        // 이전 제품 삭제


        res.status(200).json(newProduct);
    } catch (error) {
        console.error(error);
        commonError(res, 900, "Unexpected Error", "Failed to update product");
    }
});


/* 쿠팡 제품 삭제 (coupang_products/delete*/ 
// URL: http://localhost:5000/coupang_products/delete/(PID)
// Method: DELETE
router.delete("/delete/:pid", async (req, res) => {
    const { pid } = req.params;

    try {
        await prisma.coupang_products.delete({
            where: { pid: Number(pid) } 
            // prisma coupang_products의 PID를 통해 삭제 기능
        });
        // 삭제 완료시 " coupang product deleted successfully" 출력
        res.status(200).json({ message: "coupang product deleted successfully" });
    } catch (error) { // 삭제 기능이 안먹을 때 예외 
        console.error(error);
        handleCommonError(res, 900, "Unexpected Error", "Failed to delete product");
    }
});

export default router;