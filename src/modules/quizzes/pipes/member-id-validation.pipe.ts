import {
  ArgumentMetadata,
  Injectable,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import { MembersService } from 'src/modules/members';

import { EErrorMessage } from 'src/common';

@Injectable()
export class MemberIdValidationPipe implements PipeTransform {
  constructor(private readonly membersService: MembersService) {}

  async transform(
    data: { memberId: string },
    metadata: ArgumentMetadata,
  ) {
    const memberId = data.memberId;
    const existingMember = await this.membersService.findOne(memberId);

    return data;
  }
}
