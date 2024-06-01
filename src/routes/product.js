import express from "express";

const router = express.Router();
const prisma = new PrismaClient();


 /* 쿠팡 제품 생성 (coupang_products/create) */
router.post("/create", async (req, res)=> {
    const {product_id, product_number,category,name,base_price,price,unit_price,arrival,rating,reward,url} = req.body;
    console.log(product_id, product_number,category,name,base_price,price,unit_price,arrival,rating,reward,url);

    try {

    }catch {
        
    }
    
}) 