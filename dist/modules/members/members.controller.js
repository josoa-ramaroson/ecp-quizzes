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
exports.MembersController = void 0;
const common_1 = require("@nestjs/common");
const members_service_1 = require("./members.service");
const dto_1 = require("./dto");
const interceptors_1 = require("./interceptors");
const dto_2 = require("./dto");
const common_2 = require("../../common");
let MembersController = class MembersController {
    constructor(memberService) {
        this.memberService = memberService;
    }
    async findAll() {
        return await this.memberService.findAll();
    }
    async findOne(id) {
        return await this.memberService.findOne(id);
    }
    async createOne(createMemberDto) {
        return await this.memberService.createOne(createMemberDto);
    }
    async updateProfile(updateMemberProfileDto, req) {
        const memberId = req.user?.sub;
        if (!memberId)
            throw new common_1.UnauthorizedException(common_2.EErrorMessage.INVALID_TOKEN_ERROR);
        return await this.memberService.updateProfile(memberId, updateMemberProfileDto);
    }
    async updateOne(id, updateMemberDto) {
        return await this.memberService.updateOne(id, updateMemberDto);
    }
    async deleteOne(id) {
        return await this.memberService.deleteOne(id);
    }
};
exports.MembersController = MembersController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MembersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MembersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)(interceptors_1.HashPasswordInterceptor),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateMemberDto]),
    __metadata("design:returntype", Promise)
], MembersController.prototype, "createOne", null);
__decorate([
    (0, common_1.Put)('profile'),
    (0, common_1.UseInterceptors)(interceptors_1.HashPasswordInterceptor),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.UpdateMemberProfileDto, Object]),
    __metadata("design:returntype", Promise)
], MembersController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseInterceptors)(interceptors_1.HashPasswordInterceptor),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_2.UpdateMemberDto]),
    __metadata("design:returntype", Promise)
], MembersController.prototype, "updateOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseInterceptors)(interceptors_1.RemovePasswordInterceptor),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MembersController.prototype, "deleteOne", null);
exports.MembersController = MembersController = __decorate([
    (0, common_1.Controller)('members'),
    __metadata("design:paramtypes", [members_service_1.MembersService])
], MembersController);
//# sourceMappingURL=members.controller.js.map