"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./create-quiz.dto"), exports);
__exportStar(require("./update-quiz.dto"), exports);
__exportStar(require("./add-one-question.dto"), exports);
__exportStar(require("./add-many-question.dto"), exports);
__exportStar(require("./evaluate-quiz.dto"), exports);
__exportStar(require("./evaluate-quiz-response.dto"), exports);
__exportStar(require("./response-quizzes-of-member.dto"), exports);
__exportStar(require("./response-question-of-quiz.dto"), exports);
//# sourceMappingURL=index.js.map