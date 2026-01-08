import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dto/create-player.dto';
export declare class PlayersController {
    private readonly playersService;
    constructor(playersService: PlayersService);
    create(createPlayerDto: CreatePlayerDto): Promise<import("./player.entity").Player>;
    findAll(): Promise<import("./player.entity").Player[]>;
}
