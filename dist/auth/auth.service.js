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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("../common");
const members_service_1 = require("../modules/members/members.service");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(memberService, hashingService, jwtService) {
        this.memberService = memberService;
        this.hashingService = hashingService;
        this.jwtService = jwtService;
    }
    async memberSignIn(signInDto) {
        const { pseudo, password } = signInDto;
        const member = await this.memberService.findOneByPseudo(pseudo);
        const hashedPassword = member.password;
        console.log(member);
        const isAuthenticated = await this.hashingService.verifyPassword(password, hashedPassword);
        if (!isAuthenticated)
            throw new common_1.UnauthorizedException();
        const payload = {
            pseudo: member.pseudo,
            sub: member._id.toString(),
            role: member.role,
        };
        return {
            accessToken: await this.jwtService.signAsync(payload),
        };
    }
    async moderatorSignIn(signInDto) {
        const { pseudo, password } = signInDto;
        const moderator = await this.memberService.findOneByPseudo(pseudo);
        const hashedPassword = moderator.password;
        const isAuthenticated = await this.hashingService.verifyPassword(password, hashedPassword);
        if (!isAuthenticated && moderator.role != common_2.EMemberRole.MODERATOR)
            throw new common_1.UnauthorizedException(common_2.EErrorMessage.UNAUTHORIZED_ERROR);
        const payload = {
            pseudo: moderator.pseudo,
            sub: moderator._id.toString(),
            role: moderator.role,
        };
        return {
            accessToken: await this.jwtService.signAsync(payload),
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(common_2.C_HASHING_SERVICE)),
    __metadata("design:paramtypes", [members_service_1.MembersService, Object, jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map