import { Document, Types } from 'mongoose';
import { EMemberRole } from '../enums';

export interface IMember extends Document {
  _id: Types.ObjectId;
  pseudo: string;
  firstName: string;
  facebookName: string;
  role: EMemberRole;
  password: string;
  totalScore: number;
  rank?: number;
  hasPasswordChanged: boolean;
  isActiveAccount: boolean;
}
