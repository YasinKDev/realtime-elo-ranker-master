import { EventEmitter2 } from '@nestjs/event-emitter';
import { Observable } from 'rxjs';
import { RankingService } from './ranking.service';
export declare class RankingController {
    private readonly rankingService;
    private readonly eventEmitter;
    constructor(rankingService: RankingService, eventEmitter: EventEmitter2);
    getRanking(): import("../players/player.entity").Player[];
    sse(): Observable<any>;
}
