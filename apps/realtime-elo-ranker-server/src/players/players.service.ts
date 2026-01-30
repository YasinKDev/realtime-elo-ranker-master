import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter'; 
import { Player } from './player.entity';
import { CreatePlayerDto } from './dto/create-player.dto';
import { RankingUpdateEvent } from '../ranking/ranking-update.event'; 

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
    private eventEmitter: EventEmitter2, 
  ) {}

  async findAll(): Promise<Player[]> {
    return this.playerRepository.find();
  }

  async findOne(id: string): Promise<Player | null> {
    return this.playerRepository.findOneBy({ id });
  }

  async save(player: Player): Promise<Player> {
    return this.playerRepository.save(player);
  }

  async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const existingPlayer = await this.findOne(createPlayerDto.id);
    if (existingPlayer) {
      throw new ConflictException(`Le joueur ${createPlayerDto.id} existe déjà.`);
    }

    const player = this.playerRepository.create({
      id: createPlayerDto.id,
    });

    const savedPlayer = await this.playerRepository.save(player);

    this.eventEmitter.emit(
      'ranking.update',
      new RankingUpdateEvent(savedPlayer.id, savedPlayer.rank),
    );

    return savedPlayer;
  }
}