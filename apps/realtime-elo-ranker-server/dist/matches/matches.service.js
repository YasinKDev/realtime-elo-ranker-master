"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchesService = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const players_service_1 = require("../players/players.service");
const ranking_update_event_1 = require("../ranking/ranking-update.event");
let MatchesService = class MatchesService {
    playersService;
    eventEmitter;
    K_FACTOR = 32;
    constructor(playersService, eventEmitter) {
        this.playersService = playersService;
        this.eventEmitter = eventEmitter;
    }
    async recordMatch(createMatchDto) {
        const { winner: winnerId, loser: loserId, draw } = createMatchDto;
        const winner = await this.playersService.findOne(winnerId);
        const loser = await this.playersService.findOne(loserId);
        if (!winner || !loser) {
            throw new common_1.UnprocessableEntityException("Un des joueurs n'existe pas");
        }
        this.calculateElo(winner, loser, draw);
        await this.playersService.save(winner);
        await this.playersService.save(loser);
        this.eventEmitter.emit('ranking.update', new ranking_update_event_1.RankingUpdateEvent(winner.id, winner.rank));
        this.eventEmitter.emit('ranking.update', new ranking_update_event_1.RankingUpdateEvent(loser.id, loser.rank));
        return { winner, loser };
    }
    calculateElo(playerA, playerB, isDraw) {
        const scoreA = isDraw ? 0.5 : 1;
        const scoreB = isDraw ? 0.5 : 0;
        const expectedA = 1 / (1 + Math.pow(10, (playerB.rank - playerA.rank) / 400));
        const expectedB = 1 / (1 + Math.pow(10, (playerA.rank - playerB.rank) / 400));
        playerA.rank = Math.round(playerA.rank + this.K_FACTOR * (scoreA - expectedA));
        playerB.rank = Math.round(playerB.rank + this.K_FACTOR * (scoreB - expectedB));
    }
};
exports.MatchesService = MatchesService;
exports.MatchesService = MatchesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [players_service_1.PlayersService,
        event_emitter_1.EventEmitter2])
], MatchesService);
//# sourceMappingURL=matches.service.js.map