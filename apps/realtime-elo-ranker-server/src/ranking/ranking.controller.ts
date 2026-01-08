import { Controller, Get, Sse } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Observable, fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';
import { RankingService } from './ranking.service';
import { RankingUpdateEvent } from './ranking-update.event';

@Controller('ranking')
export class RankingController {
  constructor(
    private readonly rankingService: RankingService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @Get()
  getRanking() {
    return this.rankingService.getRanking();
  }

  @Sse('events')
  sse(): Observable<any> {
    return fromEvent(this.eventEmitter, 'ranking.update').pipe(
      map((event: RankingUpdateEvent) => {
        return {
          data: {
            type: 'RankingUpdate',
            player: {
              id: event.playerId,
              rank: event.rank,
            },
          },
        };
      }),
    );
  }
}