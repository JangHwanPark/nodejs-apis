const jwt = require('jsonwebtoken');
const { blacklist } = require('../routes/logout'); // 블랙리스트 가져오기

const authenticate = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');

    if (blacklist.includes(token)) {
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

module.exports = authenticate;