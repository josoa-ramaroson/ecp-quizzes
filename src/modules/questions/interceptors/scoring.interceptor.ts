import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { map, Observable } from "rxjs";
import { IMember } from "src/common";
import { Member } from "src/modules/members";
import { CheckAnswersResponseDto } from "../dto";

@Injectable()
export class ScoringInterceptor implements NestInterceptor {
    constructor(@InjectModel(Member.name) private readonly memberModel: Model<IMember>) {}
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next
            .handle()
            .pipe(map( async (data: CheckAnswersResponseDto)=>{
                const memberId = data.memberId;
                // Score from the answer validation process
                const score = data.score;
                const memberDocument = await this.memberModel.findById(memberId);
                if (memberDocument)
                    memberDocument.totalScore += score;
                await memberDocument?.save();
                return data;
            }));
    }
}