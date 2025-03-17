"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatsModule = void 0;
const common_1 = require("@nestjs/common");
const stats_service_1 = require("./stats.service");
const stats_controller_1 = require("./stats.controller");
const members_1 = require("../members");
const quizzes_1 = require("../quizzes");
const answer_history_module_1 = require("../answer-history/answer-history.module");
const questions_1 = require("../questions");
let StatsModule = class StatsModule {
};
exports.StatsModule = StatsModule;
exports.StatsModule = StatsModule = __decorate([
    (0, common_1.Module)({
        imports: [members_1.MembersModule, quizzes_1.QuizzesModule, answer_history_module_1.AnswerHistoryModule, questions_1.QuestionsModule],
        providers: [stats_service_1.StatsService],
        controllers: [stats_controller_1.StatsController],
    })
], StatsModule);
//# sourceMappingURL=stats.module.js.map