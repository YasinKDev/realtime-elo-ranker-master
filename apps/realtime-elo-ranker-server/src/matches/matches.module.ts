import { Module } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { MatchesController } from './matches.controller';
import { PlayersModule } from '../players/players.module';

@Module({
  imports: [PlayersModule],
  providers: [MatchesService],
  controllers: [MatchesController]
})
export class MatchesModule {}
