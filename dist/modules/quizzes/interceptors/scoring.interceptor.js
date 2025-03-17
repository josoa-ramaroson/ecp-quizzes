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
exports.ScoringInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const members_1 = require("../../members");
const common_2 = require("../../../common");
let ScoringInterceptor = class ScoringInterceptor {
    constructor(membersService) {
        this.membersService = membersService;
    }
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const memberId = request.user?.sub;
        if (!memberId) {
            throw new common_1.UnauthorizedException(common_2.EErrorMessage.INVALID_TOKEN_ERROR);
        }
        return next.handle().pipe((0, rxjs_1.map)(async (data) => {
            const resolvedData = await data;
            const score = resolvedData.score;
            const memberDocument = await this.membersService.findOne(memberId);
            if (memberDocument)
                memberDocument.totalScore += score;
            await this.membersService.updateOne(memberId, memberDocument);
            return data;
        }));
    }
};
exports.ScoringInterceptor = ScoringInterceptor;
exports.ScoringInterceptor = ScoringInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [members_1.MembersService])
], ScoringInterceptor);
//# sourceMappingURL=scoring.interceptor.js.map