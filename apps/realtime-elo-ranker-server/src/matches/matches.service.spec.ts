import { Test, TestingModule } from '@nestjs/testing';
import { MatchesService } from './matches.service';
import { PlayersService } from '../players/players.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

describe('MatchesService', () => {
  let service: MatchesService;

  const mockPlayersService = {
    findOne: jest.fn(),
    save: jest.fn(),
  };

  const mockEventEmitter = {
    emit: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MatchesService,
        {
          provide: PlayersService,
          useValue: mockPlayersService,
        },
        {
          provide: EventEmitter2,
          useValue: mockEventEmitter,
        },
      ],
    }).compile();

    service = module.get<MatchesService>(MatchesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});