import { ArgumentMetadata, Injectable, NotFoundException, PipeTransform } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { EErrorMessage, IMember } from "src/common";
import { Member } from "src/modules/members";
import { CheckAnswersDto } from "../dto";

@Injectable()
export class MemberIdValidationPipe implements PipeTransform {
    constructor(@InjectModel(Member.name) private readonly memberModel: Model<IMember>) {}
    
    transform(checkAnswersDto: CheckAnswersDto, metadata: ArgumentMetadata) {
        const existingMember = this.memberModel.findById(checkAnswersDto.memberId);
        if (!existingMember)
            throw new NotFoundException(EErrorMessage.MEMBER_NOT_FOUND);
        return checkAnswersDto;
    }
}