import prisma from "../utils/prismaClient.js";

/* 서비스 레이어는 실제 비즈니스로직을 구현하며, 쿼리, 계산, 외부 API 호출등을 처리한다. */
export const createProduct = async (productData) => {
    const { pid, category, name, base_price, price, unit_price, arrival, rating, reward, url } = productData;
    if (!name || !base_price || !price || !unit_price) throw new Error("Missing required fields");

    return prisma.coupang_products.create({
        data: {pid: parseInt(pid), category, name, base_price, price, unit_price, arrival, rating, reward, url}
    });
}

export const getProductsByCategory = async (category) => {
    return prisma.coupang_products.findMany({where: {category}});
};

export const deleteProduct = async (productId) => {
    // prisma coupang_products의 PID를 통해 삭제 기능
    const product = await prisma.coupang_products.delete({where: { pid: Number(productId) }});
    if (!productId) throw new Error("The product does not exist");
    return product;
}