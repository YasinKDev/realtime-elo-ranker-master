import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from './player.entity';
import { CreatePlayerDto } from './dto/create-player.dto';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
  ) {}

  async findAll(): Promise<Player[]> {
    return this.playerRepository.find();
  }

  async findOne(id: string): Promise<Player | null> {
    return this.playerRepository.findOneBy({ id });
  }

  async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const existingPlayer = await this.findOne(createPlayerDto.id);
    if (existingPlayer) {
      throw new ConflictException(`Le joueur ${createPlayerDto.id} existe déjà.`);
    }

    const player = this.playerRepository.create({
      id: createPlayerDto.id,
    });

    return this.playerRepository.save(player);
  }
  async save(player: Player): Promise<Player> {
    return this.playerRepository.save(player);
  }
}