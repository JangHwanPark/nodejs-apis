import express from "express";

// Time Out
const timeoutMiddleware = (req, res, next) => {
    const timeout = setTimeout(() => {
        res.status(400).json({
            error: "Request Timeout"
        });
    }, 10);

    // Timeout clear
    res.on("finish", () => clearTimeout(timeout));
    next();
};

// Retry packet
const retryMiddleware = (req, res, next) => {
    let attempts = 0;
    const maxAttempts = 3;

    const retry = async () => {
        attempts++;

        try {
            await next();
        } catch (err) {
            if (attempts < maxAttempts) {
                // Test Log
                console.log(`Retrying .. ${attempts}`)
                retry();
            } else {
                res.status(500).json({
                    error: "Maximum retry attempts reached"
                });
            }
        }
    }

    retry();
};

const app = express();
app.use(timeoutMiddleware);
app.use(retryMiddleware);

export {
    timeoutMiddleware,
    retryMiddleware
};