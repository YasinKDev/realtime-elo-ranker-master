import { Test, TestingModule } from '@nestjs/testing';
import { RankingService } from './ranking.service';
import { PlayersService } from '../players/players.service';

describe('RankingService', () => {
  let service: RankingService;

  const mockPlayersService = {
    findAll: jest.fn(() => Promise.resolve([])), // Simule une liste vide au démarrage
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RankingService,
        {
          provide: PlayersService,
          useValue: mockPlayersService,
        },
      ],
    }).compile();

    service = module.get<RankingService>(RankingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});