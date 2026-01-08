import { Injectable, OnModuleInit } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { PlayersService } from '../players/players.service';
import { Player } from '../players/player.entity';

@Injectable()
export class RankingService implements OnModuleInit {
  private ranking: Player[] = [];

  constructor(private readonly playersService: PlayersService) {}

  async onModuleInit() {
    await this.updateRanking();
  }

  getRanking(): Player[] {
    return this.ranking;
  }

  async updateRanking(): Promise<void> {
    const players = await this.playersService.findAll();
    this.ranking = players.sort((a, b) => b.rank - a.rank);
  }

  @OnEvent('ranking.update')
  async handleRankingUpdate() {
    await this.updateRanking();
  }
}