function selectTurnServers(servers = []) { return Array.isArray(servers) ? servers.slice() : []; }
module.exports = { selectTurnServers };
