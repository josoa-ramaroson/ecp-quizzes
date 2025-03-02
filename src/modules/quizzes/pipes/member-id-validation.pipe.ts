import {
  ArgumentMetadata,
  Injectable,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import { MembersService } from 'src/modules/members';
import { EvaluateQuizDto } from '../dto';
import { EErrorMessage } from 'src/common';

@Injectable()
export class MemberIdValidationPipe implements PipeTransform {
  constructor(private readonly membersService: MembersService) {}

  async transform(
    evaluateQuizDto: EvaluateQuizDto,
    metadata: ArgumentMetadata,
  ) {
    try {
      const existingMember = await this.membersService.findOne(
        evaluateQuizDto.memberId,
      );
    } catch (error) {
      throw new NotFoundException(EErrorMessage.MEMBER_NOT_FOUND);
    }

    return evaluateQuizDto;
  }
}
