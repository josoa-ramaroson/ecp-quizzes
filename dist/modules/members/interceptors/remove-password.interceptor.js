"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemovePasswordInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
let RemovePasswordInterceptor = class RemovePasswordInterceptor {
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.map)((data) => {
            if (data) {
                if (Array.isArray(data)) {
                    return data.map((item) => {
                        return {
                            _id: item._id,
                            pseudo: item.pseudo,
                            firstName: item.firstName,
                            facebookName: item.facebookName,
                            role: item.role,
                        };
                    });
                }
                else if (typeof data == 'object') {
                    return {
                        _id: data._id,
                        pseudo: data.pseudo,
                        firstName: data.firstName,
                        facebookName: data.facebookName,
                        role: data.role,
                    };
                }
            }
        }));
    }
};
exports.RemovePasswordInterceptor = RemovePasswordInterceptor;
exports.RemovePasswordInterceptor = RemovePasswordInterceptor = __decorate([
    (0, common_1.Injectable)()
], RemovePasswordInterceptor);
//# sourceMappingURL=remove-password.interceptor.js.map