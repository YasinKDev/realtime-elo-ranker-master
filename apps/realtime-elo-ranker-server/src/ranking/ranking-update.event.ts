export class RankingUpdateEvent {
  constructor(
    public readonly playerId: string,
    public readonly rank: number,
  ) {}
}