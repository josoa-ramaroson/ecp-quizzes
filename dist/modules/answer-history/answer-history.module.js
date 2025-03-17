"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnswerHistoryModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const answer_history_service_1 = require("./answer-history.service");
const answer_history_controller_1 = require("./answer-history.controller");
const answer_history_schema_1 = require("./schemas/answer-history.schema");
let AnswerHistoryModule = class AnswerHistoryModule {
};
exports.AnswerHistoryModule = AnswerHistoryModule;
exports.AnswerHistoryModule = AnswerHistoryModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: answer_history_schema_1.AnswerHistory.name, schema: answer_history_schema_1.AnswerHistorySchema },
            ]),
        ],
        controllers: [answer_history_controller_1.AnswerHistoryController],
        providers: [answer_history_service_1.AnswerHistoryService],
        exports: [answer_history_service_1.AnswerHistoryService],
    })
], AnswerHistoryModule);
//# sourceMappingURL=answer-history.module.js.map