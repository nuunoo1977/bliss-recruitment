import { QuestionChoice } from "./question-choice";

export class QuestionUpdate {
    id: number;
    question: string;
    image_url: string;
    thumb_url: string;
    choices: QuestionChoice[]
};