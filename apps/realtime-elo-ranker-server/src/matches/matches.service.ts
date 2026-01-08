import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PlayersService } from '../players/players.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { Player } from '../players/player.entity';
import { RankingUpdateEvent } from '../ranking/ranking-update.event';

@Injectable()
export class MatchesService {
  private readonly K_FACTOR = 32;

  constructor(
    private readonly playersService: PlayersService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async recordMatch(createMatchDto: CreateMatchDto) {
    const { winner: winnerId, loser: loserId, draw } = createMatchDto;

    const winner = await this.playersService.findOne(winnerId);
    const loser = await this.playersService.findOne(loserId);

    if (!winner || !loser) {
      throw new UnprocessableEntityException("Un des joueurs n'existe pas");
    }

    this.calculateElo(winner, loser, draw);

    await this.playersService.save(winner);
    await this.playersService.save(loser);

    this.eventEmitter.emit(
      'ranking.update',
      new RankingUpdateEvent(winner.id, winner.rank),
    );
    this.eventEmitter.emit(
      'ranking.update',
      new RankingUpdateEvent(loser.id, loser.rank),
    );

    return { winner, loser };
  }

  private calculateElo(playerA: Player, playerB: Player, isDraw: boolean) {
    const scoreA = isDraw ? 0.5 : 1;
    const scoreB = isDraw ? 0.5 : 0;

    const expectedA = 1 / (1 + Math.pow(10, (playerB.rank - playerA.rank) / 400));
    const expectedB = 1 / (1 + Math.pow(10, (playerA.rank - playerB.rank) / 400));

    playerA.rank = Math.round(playerA.rank + this.K_FACTOR * (scoreA - expectedA));
    playerB.rank = Math.round(playerB.rank + this.K_FACTOR * (scoreB - expectedB));
  }
}