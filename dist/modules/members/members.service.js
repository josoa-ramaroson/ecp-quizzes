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
exports.MembersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const schemas_1 = require("./schemas");
const common_2 = require("../../common");
let MembersService = class MembersService {
    constructor(memberModel) {
        this.memberModel = memberModel;
    }
    async createOne(createMemberDto) {
        const existingMember = await this.memberModel.findOne({
            pseudo: createMemberDto.pseudo,
        });
        if (existingMember)
            throw new common_1.ConflictException(common_2.EErrorMessage.MEMBER_ALREADY_EXISTS);
        const newMember = new this.memberModel({
            totalScore: 0,
            ...createMemberDto,
        });
        return await newMember.save();
    }
    async findAll() {
        const existingMember = await this.memberModel.find({}, { password: 0 });
        return existingMember;
    }
    async findAllMember(role) {
        const existingMember = await this.memberModel.find({ role: role }, { password: 0 });
        return existingMember;
    }
    async findOne(id) {
        const existingMember = await this.memberModel.findById(id, { password: 0 });
        if (!existingMember)
            throw new common_1.NotFoundException(common_2.EErrorMessage.MEMBER_NOT_FOUND);
        const memberObj = existingMember.toObject();
        memberObj.rank = await this.getRank(id);
        return memberObj;
    }
    async findOneByPseudo(pseudo) {
        const existingMember = await this.memberModel.findOne({ pseudo: pseudo });
        if (!existingMember)
            throw new common_1.NotFoundException(common_2.EErrorMessage.AUTH_FAILED_ERROR);
        return existingMember;
    }
    async getMembersRanking() {
        const members = await this.memberModel.find({}, { password: 0 });
        const sortedMembers = members.sort((a, b) => b.totalScore - a.totalScore);
        return sortedMembers;
    }
    async getRank(memberId) {
        const membersWithRanking = await this.getMembersRanking();
        const index = membersWithRanking.findIndex((member) => member._id.toString() === memberId);
        return index !== -1 ? index + 1 : -1;
    }
    async getTotalCount() {
        return await this.memberModel.countDocuments();
    }
    async updateOne(id, updateMemberDto) {
        const updatedMember = await this.memberModel.findByIdAndUpdate(id, updateMemberDto, {
            new: true,
            select: { password: 0 },
        });
        if (!updatedMember)
            throw new common_1.NotFoundException(common_2.EErrorMessage.UPDATED_MEMBER_NOT_FOUND);
        return updatedMember;
    }
    async updateProfile(memberId, memberData) {
        const updateData = {
            firstName: memberData.firstName,
            facebookName: memberData.facebookName,
            pseudo: memberData.pseudo,
        };
        if (memberData.password) {
            updateData['password'] = memberData.password;
            updateData['hasPasswordChanged'] = true;
        }
        const existingPseudo = await this.memberModel.findOne({
            pseudo: memberData.pseudo,
        });
        console.log(memberId);
        console.log(existingPseudo);
        if (existingPseudo && existingPseudo._id.toString() !== memberId)
            throw new common_1.ConflictException(common_2.EErrorMessage.MEMBER_PSEUDO_ALREADY_USED);
        const updatedMember = await this.memberModel.findByIdAndUpdate(memberId, updateData, {
            new: true,
            select: { password: 0 },
        });
        if (!updatedMember)
            throw new common_1.NotFoundException(common_2.EErrorMessage.UPDATED_MEMBER_NOT_FOUND);
        return updatedMember;
    }
    async deleteOne(id) {
        const deletedMember = await this.memberModel.findByIdAndDelete(id);
        if (!deletedMember)
            throw new common_1.NotFoundException(common_2.EErrorMessage.MEMBER_NOT_FOUND);
        return deletedMember;
    }
};
exports.MembersService = MembersService;
exports.MembersService = MembersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(schemas_1.Member.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], MembersService);
//# sourceMappingURL=members.service.js.map