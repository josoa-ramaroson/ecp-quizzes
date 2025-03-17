"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizzesModule = void 0;
const common_1 = require("@nestjs/common");
const questions_module_1 = require("../questions/questions.module");
const mongoose_1 = require("@nestjs/mongoose");
const schema_1 = require("./schema");
const quizzes_controller_1 = require("./quizzes.controller");
const quizzes_service_1 = require("./quizzes.service");
const pipes_1 = require("./pipes");
const members_1 = require("../members");
const answer_history_module_1 = require("../answer-history/answer-history.module");
const common_module_1 = require("../../common/common.module");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let QuizzesModule = class QuizzesModule {
};
exports.QuizzesModule = QuizzesModule;
exports.QuizzesModule = QuizzesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: schema_1.Quiz.name, schema: schema_1.QuizSchema }]),
            questions_module_1.QuestionsModule,
            members_1.MembersModule,
            answer_history_module_1.AnswerHistoryModule,
            common_module_1.CommonModule,
            config_1.ConfigModule,
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    global: true,
                    secret: configService.get('JWT_SECRET'),
                    signOptions: { expiresIn: '3d' },
                }),
                inject: [config_1.ConfigService],
            }),
        ],
        controllers: [quizzes_controller_1.QuizzesController],
        providers: [
            quizzes_service_1.QuizzesService,
            pipes_1.VerifyOneQuestionIdPipe,
            pipes_1.VerifyManyQuestionIdPipe,
        ],
        exports: [quizzes_service_1.QuizzesService],
    })
], QuizzesModule);
//# sourceMappingURL=quizzes.module.js.map