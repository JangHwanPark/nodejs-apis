import * as prismaService from "../service/prismaService.js";

// 공통 에러 처리 함수
const handleCommonError = (res, errorCode, errorMessage, description ) => {
    res.status(500).json({ errorCode, errorMessage, description });
};

export const getAllBookReview = async (req, res) => {
    try {
        const book_review = prismaService.getAllData('book_review');
        res.status(200).json(book_review);
    } catch (error) {
        handleCommonError(res, 900, "Bad Request Exception", "Unable to retrieve data");
    }
}