import { MatchesService } from './matches.service';
import { CreateMatchDto } from './dto/create-match.dto';
export declare class MatchesController {
    private readonly matchesService;
    constructor(matchesService: MatchesService);
    create(createMatchDto: CreateMatchDto): Promise<{
        winner: import("../players/player.entity").Player;
        loser: import("../players/player.entity").Player;
    }>;
}
