class RoomManager {
  constructor(rooms = new Map()) { this.rooms = rooms; }
  get(roomId) { return this.rooms.get(roomId); }
  delete(roomId) { return this.rooms.delete(roomId); }
  values() { return this.rooms.values(); }
  get size() { return this.rooms.size; }
}
module.exports = { RoomManager };
