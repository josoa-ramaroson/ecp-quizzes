import {
  ArgumentMetadata,
  Injectable,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import { MembersService } from 'src/modules/members';


@Injectable()
export class MemberIdValidationPipe implements PipeTransform {
  constructor(private readonly membersService: MembersService) {}

  async transform(
    memberId: string,
    metadata: ArgumentMetadata,
  ) {

    const existingMember = await this.membersService.findOne(memberId);

    return memberId;
  }
}
