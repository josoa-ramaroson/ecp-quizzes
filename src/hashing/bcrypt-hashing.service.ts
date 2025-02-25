import { IHashingService } from "src/common";
import * as bcrypt from 'bcrypt';
import { Injectable } from "@nestjs/common";

@Injectable()
export class BCryptHashingService implements IHashingService {
    
    private readonly saltOrRounds = 10;
    
    async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, this.saltOrRounds);
    }

    async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword);
    }
}