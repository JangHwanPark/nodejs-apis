import jwt from "jsonwebtoken";
import {isTokenBlacklisted} from "../service/auth/LoginService.js";

const authenticate = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');

    if (isTokenBlacklisted.includes(token)) {
        return res.status(401).json({
            errorCode: 101,
            errorMessage: "Unauthorized Exception",
            description: "Token is blacklisted"
        });
    }

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (error) {
        return res.status(401).json({
            errorCode: 101,
            errorMessage: "Unauthorized Exception",
            description: "Invalid token"
        });
    }
};

export default authenticate;