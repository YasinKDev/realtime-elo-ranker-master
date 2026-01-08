import { OnModuleInit } from '@nestjs/common';
import { PlayersService } from '../players/players.service';
import { Player } from '../players/player.entity';
export declare class RankingService implements OnModuleInit {
    private readonly playersService;
    private ranking;
    constructor(playersService: PlayersService);
    onModuleInit(): Promise<void>;
    getRanking(): Player[];
    updateRanking(): Promise<void>;
}
