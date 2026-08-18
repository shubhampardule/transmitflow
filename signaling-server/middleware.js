function createMiddleware({ cors, rateLimiter, payloadValidator } = {}) { return { cors, rateLimiter, payloadValidator }; }
module.exports = { createMiddleware };
