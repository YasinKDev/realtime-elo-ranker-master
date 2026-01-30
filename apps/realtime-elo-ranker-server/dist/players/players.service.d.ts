import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Player } from './player.entity';
import { CreatePlayerDto } from './dto/create-player.dto';
export declare class PlayersService {
    private playerRepository;
    private eventEmitter;
    constructor(playerRepository: Repository<Player>, eventEmitter: EventEmitter2);
    findAll(): Promise<Player[]>;
    findOne(id: string): Promise<Player | null>;
    save(player: Player): Promise<Player>;
    create(createPlayerDto: CreatePlayerDto): Promise<Player>;
}
