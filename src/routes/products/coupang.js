import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// 공통 에러 처리 함수
const handleCommonError = (res, errorCode, errorMessage, description) => {
    res.status(500).json({ errorCode, errorMessage, description });
};

/* 쿠팡 제품 생성 (/coupang_products/add) */
// URL: http://localhost:포트번호/coupang_products/add
// Method: POST
router.post("/add", async (req, res) => {
    const { pid, category, name, base_price, price, unit_price, arrival, rating, reward, url } = req.body;

    try {
        // Prisma를 사용하여 쿠팡 제품 생성
        const product = await prisma.coupang_products.create({
            data: {
                pid: parseInt(pid),
                category,
                name,
                base_price,
                price,
                unit_price,
                arrival,
                rating,
                reward,
                url
            }
        });
        res.status(201).json(product); // 제품이 성공적으로 생성되었음을 클라이언트에게 응답
    } catch (error) {
        console.error(error);
        handleCommonError(res, 900, "Unexpected Error", "Failed to create product");
    }
});

/* 쿠팡 제품 조회 (/coupang_products/:category) */
// URL: http://localhost:포트번호/coupang_products/:category
// Method: GET
router.get("/:category", async (req, res) => {
    const { category } = req.params;

    try {
        // Prisma를 사용하여 해당 카테고리의 쿠팡 제품들 조회
        const products = await prisma.coupang_products.findMany({
            where: { category }
        });
        res.status(200).json(products); // 조회된 제품들을 클라이언트에게 응답
    } catch (error) {
        console.error(error);
        handleCommonError(res, 900, "Unexpected Error", "Failed to fetch products");
    }
});

/* 쿠팡 제품 수정 (/coupang_products/update/:pid) */
// URL: http://localhost:포트번호/coupang_products/update/:pid
// Method: POST (보통은 PUT 또는 PATCH를 사용하나, 여기서는 POST로 구현)
router.post("/update/:pid", async (req, res) => {
    const { pid } = req.params;
    const { category, name, base_price, price, unit_price, arrival, rating, reward, url } = req.body;

    try {
        // Prisma를 사용하여 해당 PID의 쿠팡 제품 수정
        const updatedProduct = await prisma.coupang_products.update({
            where: { pid: parseInt(pid) },
            data: {
                category,
                name,
                base_price,
                price,
                unit_price,
                arrival,
                rating,
                reward,
                url
            }
        });
        res.status(200).json(updatedProduct); // 수정된 제품을 클라이언트에게 응답
    } catch (error) {
        console.error(error);
        handleCommonError(res, 900, "Unexpected Error", "Failed to update product");
    }
});

/* 쿠팡 제품 삭제 (/coupang_products/delete/:pid) */
// URL: http://localhost:포트번호/coupang_products/delete/:pid
// Method: DELETE
router.delete("/delete/:pid", async (req, res) => {
    const { pid } = req.params;

    try {
        // Prisma를 사용하여 해당 PID의 쿠팡 제품 삭제
        await prisma.coupang_products.delete({
            where: { pid: parseInt(pid) }
        });
        res.status(200).json({ message: "coupang product deleted successfully" }); // 삭제 성공 메시지를 클라이언트에게 응답
    } catch (error) {
        console.error(error);
        handleCommonError(res, 900, "Unexpected Error", "Failed to delete product");
    }
});

export default router;
