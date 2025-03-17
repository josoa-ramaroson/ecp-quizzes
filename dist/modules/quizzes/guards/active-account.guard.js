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
exports.ActiveAccountGuard = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const common_2 = require("../../../common");
const members_1 = require("../../members");
const utils_1 = require("../../../utils");
let ActiveAccountGuard = class ActiveAccountGuard {
    constructor(jwtService, configService, membersService) {
        this.jwtService = jwtService;
        this.configService = configService;
        this.membersService = membersService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const token = (0, utils_1.extractTokenFromHeader)(request);
        const payload = await this.verifyToken(token);
        return await this.verifyActiveAccount(payload);
    }
    async verifyToken(token) {
        if (!token) {
            throw new common_1.UnauthorizedException(common_2.EErrorMessage.UNAUTHORIZED_ERROR);
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: this.configService.get('JWT_SECRET'),
            });
            return payload;
        }
        catch {
            throw new common_1.UnauthorizedException(common_2.EErrorMessage.INVALID_TOKEN_ERROR);
        }
    }
    async verifyActiveAccount(payload) {
        const existingMember = await this.membersService.findOne(payload.sub);
        return existingMember.isActiveAccount;
    }
};
exports.ActiveAccountGuard = ActiveAccountGuard;
exports.ActiveAccountGuard = ActiveAccountGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService,
        members_1.MembersService])
], ActiveAccountGuard);
//# sourceMappingURL=active-account.guard.js.map