import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class MemberIdValidationPipe implements PipeTransform {
    transform(value: string, metadata: ArgumentMetadata) {
        
    }
}