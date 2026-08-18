export class RepairManager {
  private round = 0;
  constructor(readonly maxRounds = 3) {}
  nextRound(): number | null { return this.round >= this.maxRounds ? null : ++this.round; }
  reset(): void { this.round = 0; }
  get rounds(): number { return this.round; }
}
