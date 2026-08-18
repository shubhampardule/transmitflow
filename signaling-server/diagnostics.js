function registerDiagnostics(app, diagnostics = {}) { if (app && typeof app.get === 'function') app.get('/health', diagnostics.health || ((_req, res) => res.status(200).json({ status: 'OK' }))); }
module.exports = { registerDiagnostics };
