import express from "express";
import axios from "axios";

const router = express.Router();
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const githubApi = axios.create({
    baseURL: process.env.GITHUB_API,
    headers: {
        "Authorization": `token ${GITHUB_TOKEN}`
    }
})


// 리포지토리 정보
router.get("/repos/:owner/:repo", async (req, res, next) => {
    const { owner, repo } = req.params;
    try {
        const response = await githubApi.get(`/repos/${owner}/${repo}`);
        res.status(200).json(response.data);
    } catch (error) {
        next(handleGitHubError(error));
    }
});

// 커밋 내역
router.get("/repos/:owner/:repo/commit", async (req, res, next) => {
    const { owner, repo } = req.params;
    try {
        const response = await githubApi.get(`/repos/${owner}/${repo}/commits`);
        res.status(200).json(response.data);
    } catch (error) {
        next(handleGitHubError(error));
    }
});

// 이슈 리스트
router.get("/repos/:owner/:repo/issue", async (req, res, next) => {
    const { owner, repo } = req.params;
    try {
        const response = await githubApi.get(`/repos/${owner}/${repo}/issues`);
        res.status(200).json(response.data);
    } catch (error) {
        next(handleGitHubError(error));
    }
});

// 풀 리퀘스트 정보
router.get("/repos/:owner/:repo/pulls", async (req, res, next) => {
    const { owner, repo } = req.params;
    try {
        const response = await githubApi.get(`/repos/${owner}/${repo}/pulls`);
        res.status(200).json(response.data);
    } catch (error) {
        next(handleGitHubError(error));
    }
});

// 풀 리퀘스트 커밋 내역
router.get("/repos/:owner/:repo/pulls/:pull_number/commit", async (req, res, next) => {
    const { owner, repo, pull_number } = req.params;
    try {
        const response = await githubApi.get(`/repos/${owner}/${repo}/pulls/${pull_number}/commits`);
        res.status(200).json(response.data);
    } catch (error) {
        next(handleGitHubError(error));
    }
});

// GitHub API 에러 처리 함수
function handleGitHubError(error) {
    let err = new Error();
    if (error.response) {
        const { status, data } = error.response;
        err.status = status;
        err.name = mapGitHubStatusToErrorName(status);
        err.message = data.message || 'An error occurred with GitHub API';
    } else {
        err.status = 500;
        err.name = 'UnexpectedError';
        err.message = 'An unexpected error occurred';
    }
    return err;
}

// GitHub API 상태 코드와 에러 이름 매핑
function mapGitHubStatusToErrorName(status) {
    switch (status) {
        case 400: return 'ValidationError';
        case 401: return 'AuthenticationError';
        case 403: return 'PermissionError';
        case 404: return 'NotFoundError';
        case 429: return 'RateLimitError';
        case 413: return 'RequestEntityTooLargeError';
        case 503: return 'ServiceUnavailableError';
        case 504: return 'GatewayTimeoutError';
        default: return 'UnexpectedError';
    }
}

export default router;