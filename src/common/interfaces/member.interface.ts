import { Document, Types } from "mongoose";
import { EMemberRole } from "../enums";

export interface IMember extends Document {
    _id: Types.ObjectId;
    email: string;
    firstName: string;
    facebookName: string;
    role: EMemberRole;
}