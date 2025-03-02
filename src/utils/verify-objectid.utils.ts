import mongoose from "mongoose";

export function verifyObjectId(id: string): boolean {
    return mongoose.Types.ObjectId.isValid(id);
}