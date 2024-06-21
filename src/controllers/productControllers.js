import * as productService from "../service/productService.js";
import * as prismaService from "../service/prismaService.js";

// 공통 에러 처리 함수
const handleCommonError = (res, errorCode, errorMessage, description ) => {
    res.status(500).json({ errorCode, errorMessage, description });
};

/* 컨트롤러는 HTTP 요청을 받아 비즈니스 로직을 처리하고 응답을 반환함 */
export const addProduct = async (req, res) => {
    try {
        const product = await productService.createProduct(req.body);
        res.status(201).json(product);
    } catch (error) { // 생성된 이외의 예외 처리
        console.error(error);
        handleCommonError(res, 900, "Unexpected Error", "Failed to create product");
    }
}

export const getAllProducts = async (req, res) => {
    try {
        const products = await prismaService.getAllData('coupang_products');
        if (products.length === 0) throw new Error("The product does not exist");
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        handleCommonError(res, 900, "Unexpected Error", "Failed to fetch products");
    }
};

export const getProductByCategory = async (req, res) => {
    try {
        const category = req.params.category; // 카테고리를 URL 파라미터에서 추출
        const products = await productService.getProductsByCategory(category);
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        handleCommonError(res, 900, "Unexpected Error", "Failed to fetch products");
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.pid;
        await productService.deleteProduct(productId);
        res.status(200).json({ message: `coupang product deleted successfully` });
    } catch (error) {
        console.error(error);
        handleCommonError(res, 900, "Unexpected Error", "Failed to delete product");
    }
}