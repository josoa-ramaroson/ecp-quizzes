"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoExceptionsFilter = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const enums_1 = require("../enums");
let MongoExceptionsFilter = class MongoExceptionsFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const status = 400;
        response.status(status).json({
            statusCode: status,
            error: 'Bad Request',
            message: enums_1.EErrorMessage.INVALID_RESSOURCE_REFERENCE,
        });
    }
};
exports.MongoExceptionsFilter = MongoExceptionsFilter;
exports.MongoExceptionsFilter = MongoExceptionsFilter = __decorate([
    (0, common_1.Catch)(mongoose_1.Error.CastError)
], MongoExceptionsFilter);
//# sourceMappingURL=mongo-exceptions.filter.js.map