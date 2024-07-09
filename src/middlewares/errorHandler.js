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
            description = err.message || 'Validation error occurred';
            break;
        case 'AuthenticationError':
            statusCode = 401;
            errorCode = 200;
            errorMessage = 'Authentication Failed';
            description = err.message || 'Authentication failed';
            break;
        case 'PermissionError':
            statusCode = 403;
            errorCode = 210;
            errorMessage = 'Permission Denied';
            description = err.message || 'Permission denied';
            break;
        case 'NotFoundError':
            statusCode = 404;
            errorCode = 300;
            errorMessage = 'Not Found Exception';
            description = err.message || 'Resource not found';
            break;
        case 'QuotaExceededError':
            statusCode = 429;
            errorCode = 400;
            errorMessage = 'Quota Exceeded';
            description = err.message || 'Quota exceeded';
            break;
        case 'RateLimitError':
            statusCode = 429;
            errorCode = 420;
            errorMessage = 'Rate Limited';
            description = err.message || 'Rate limit exceeded';
            break;
        case 'RequestEntityTooLargeError':
            statusCode = 413;
            errorCode = 430;
            errorMessage = 'Request Entity Too Large';
            description = err.message || 'Request entity too large';
            break;
        case 'ServiceUnavailableError':
            statusCode = 503;
            errorCode = 500;
            errorMessage = 'Service Unavailable';
            description = err.message || 'Service unavailable';
            break;
        case 'GatewayTimeoutError':
            statusCode = 504;
            errorCode = 510;
            errorMessage = 'Gateway Timeout';
            description = err.message || 'Gateway timeout';
            break;
        default:
            statusCode = 500;
            errorCode = 900;
            errorMessage = 'Unexpected Error';
            description = err.message || 'An unexpected error occurred';
            break;
    }

    res.status(statusCode).json({
        errorCode,
        errorMessage,
        description,
    });
}

export default errorHandler;