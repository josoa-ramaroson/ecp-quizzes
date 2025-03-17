"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveCorrectAnswerInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
let RemoveCorrectAnswerInterceptor = class RemoveCorrectAnswerInterceptor {
    intercept(context, next) {
        return next.handle().pipe((0, rxjs_1.map)((data) => {
            if (data) {
                if (Array.isArray(data)) {
                    return data.map((question) => {
                        const answersOptions = question.answersOptions;
                        return {
                            ...question,
                            answersOptions: answersOptions.map((ans) => ans.text),
                        };
                    });
                }
                else {
                    const answersOptions = data.answersOptions;
                    return {
                        ...data,
                        answersOptions: answersOptions.map((ans) => ans.text),
                    };
                }
            }
        }));
    }
};
exports.RemoveCorrectAnswerInterceptor = RemoveCorrectAnswerInterceptor;
exports.RemoveCorrectAnswerInterceptor = RemoveCorrectAnswerInterceptor = __decorate([
    (0, common_1.Injectable)()
], RemoveCorrectAnswerInterceptor);
//# sourceMappingURL=remove-correct-answer.interceptor.js.map