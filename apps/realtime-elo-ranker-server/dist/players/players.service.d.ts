import { Repository } from 'typeorm';
import { Player } from './player.entity';
import { CreatePlayerDto } from './dto/create-player.dto';
export declare class PlayersService {
    private playerRepository;
    constructor(playerRepository: Repository<Player>);
    findAll(): Promise<Player[]>;
    findOne(id: string): Promise<Player | null>;
    create(createPlayerDto: CreatePlayerDto): Promise<Player>;
    save(player: Player): Promise<Player>;
}
