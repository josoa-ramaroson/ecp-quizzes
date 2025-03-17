import { IHashingService } from 'src/common';
export declare class BCryptHashingService implements IHashingService {
    private readonly saltOrRounds;
    hashPassword(password: string): Promise<string>;
    verifyPassword(password: string, hashedPassword: string): Promise<boolean>;
}
