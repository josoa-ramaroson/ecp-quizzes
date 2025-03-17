"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyObjectId = verifyObjectId;
const mongoose_1 = require("mongoose");
function verifyObjectId(id) {
    return mongoose_1.default.Types.ObjectId.isValid(id);
}
//# sourceMappingURL=verify-objectid.utils.js.map