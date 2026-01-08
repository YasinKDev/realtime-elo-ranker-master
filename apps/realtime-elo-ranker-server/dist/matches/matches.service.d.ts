import { EventEmitter2 } from '@nestjs/event-emitter';
import { PlayersService } from '../players/players.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { Player } from '../players/player.entity';
export declare class MatchesService {
    private readonly playersService;
    private readonly eventEmitter;
    private readonly K_FACTOR;
    constructor(playersService: PlayersService, eventEmitter: EventEmitter2);
    recordMatch(createMatchDto: CreateMatchDto): Promise<{
        winner: Player;
        loser: Player;
    }>;
    private calculateElo;
}
