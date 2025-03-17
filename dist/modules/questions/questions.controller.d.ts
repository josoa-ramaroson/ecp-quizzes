import { CreateQuestionDto, UpdateQuestionDto } from './dto';
import { QuestionsService } from './questions.service';
export declare class QuestionsController {
    private questionService;
    constructor(questionService: QuestionsService);
    createOne(createQuestionDto: CreateQuestionDto): Promise<import("../../common").IQuestion>;
    findAll(): Promise<import("../../common").IQuestion[]>;
    findOne(id: string): Promise<import("../../common").IQuestion>;
    updateOne(id: string, updateQuestionDto: UpdateQuestionDto): Promise<import("../../common").IQuestion>;
    deleteOne(id: string): Promise<import("../../common").IQuestion>;
}
