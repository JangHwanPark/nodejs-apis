function errorHandler(err, req, res, next) {
    let statusCode;
    let errorCode;
    let errorMessage;
    let description;

    switch (err.name) {
        case 'ValidationError':
            statusCode = 400;
            errorCode = 100;
            errorMessage = 'Bad Request Exception';
            description = err.message;
            break;
        case 'AuthenticationError':
            statusCode = 401;
            errorCode = 200;
            errorMessage = 'Authentication Failed';
            description = err.message;
            break;
        case 'PermissionError':
            statusCode = 403;
            errorCode = 210;
            errorMessage = 'Permission Denied';
            description = err.message;
            break;
        case 'NotFoundError':
            statusCode = 404;
            errorCode = 300;
            errorMessage = 'Not Found Exception';
            description = err.message;
            break;
        case 'QuotaExceededError':
            statusCode = 429;
            errorCode = 400;
            errorMessage = 'Quota Exceeded';
            description = err.message;
            break;
        case 'RateLimitError':
            statusCode = 429;
            errorCode = 420;
            errorMessage = 'Rate Limited';
            description = err.message;
            break;
        case 'RequestEntityTooLargeError':
            statusCode = 413;
            errorCode = 430;
            errorMessage = 'Request Entity Too Large';
            description = err.message;
            break;
        case 'ServiceUnavailableError':
            statusCode = 503;
            errorCode = 500;
            errorMessage = 'Service Unavailable';
            description = err.message;
            break;
        case 'GatewayTimeoutError':
            statusCode = 504;
            errorCode = 510;
            errorMessage = 'Gateway Timeout';
            description = err.message;
            break;
        default:
            statusCode = 500;
            errorCode = 900;
            errorMessage = 'Unexpected Error';
            description = err.message;
            break;
    }

    res.status(statusCode).json({
        errorCode,
        errorMessage,
        description,
    });
}

export default errorHandler;