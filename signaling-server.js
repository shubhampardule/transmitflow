const signalingServer = require('./signaling-server/index.js');

module.exports = signalingServer;

if (require.main === module) {
  void signalingServer.startSignalingServer().catch((error) => {
    console.error('Failed to start signaling server:', error);
    process.exitCode = 1;
  });
}
