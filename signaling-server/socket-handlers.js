function registerSocketHandlers(io, handlers = {}) { if (io && typeof io.on === 'function' && typeof handlers.connection === 'function') io.on('connection', handlers.connection); }
module.exports = { registerSocketHandlers };
