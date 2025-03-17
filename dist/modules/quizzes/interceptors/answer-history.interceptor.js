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
exports.AnswerHistoryInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const answer_history_service_1 = require("../../answer-history/answer-history.service");
const common_2 = require("../../../common");
let AnswerHistoryInterceptor = class AnswerHistoryInterceptor {
    constructor(answerHistoryService) {
        this.answerHistoryService = answerHistoryService;
    }
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const memberId = request.user?.sub;
        if (!memberId) {
            throw new common_1.UnauthorizedException(common_2.EErrorMessage.INVALID_TOKEN_ERROR);
        }
        return next.handle().pipe((0, rxjs_1.map)(async (data) => {
            try {
                await this.answerHistoryService.create({ ...data, memberId });
            }
            catch (error) {
                console.error(error);
                throw new common_1.InternalServerErrorException(common_2.EErrorMessage.INTERNAL_SERVER_ERROR);
            }
            return data;
        }));
    }
};
exports.AnswerHistoryInterceptor = AnswerHistoryInterceptor;
exports.AnswerHistoryInterceptor = AnswerHistoryInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [answer_history_service_1.AnswerHistoryService])
], AnswerHistoryInterceptor);
//# sourceMappingURL=answer-history.interceptor.js.map