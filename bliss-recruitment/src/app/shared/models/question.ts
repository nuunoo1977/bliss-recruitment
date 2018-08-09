import { QuestionChoice } from './question-choice';

export class Question {
    id: number;
    question: string;
    image_url: string;
    thumb_url: string;
    published_at: Date;
    choices: QuestionChoice[];
}
