import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { QuestionsService } from '../../shared/questions.service';
import { Question } from '../../shared/question';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
    selector: 'app-question-detail',
    templateUrl: './question-detail.component.html',
    styleUrls: ['./question-detail.component.scss']
})
export class QuestionDetailComponent implements OnInit {

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private questionsService: QuestionsService
    ) {
    }

    private questionId: number;
    private question: Question = null;
    private maxVotes: number = 0;

    ngOnInit() {

        this.route.params.subscribe(params => {
            this.questionId = +params['id'];
            this.loadQuestion();
        });

    }

    loadQuestion() {
        this.questionsService.getQuestion(this.questionId).subscribe(
            (question) => {
                if (question) {
                    this.question = question;
                    this.maxVotes = this.question.choices.reduce(
                        (max, c) => c.votes > max ? c.votes : max, this.question.choices[0].votes
                    );
                }
            }
        );
    }

    gotoQuestions() {
        this.router.navigate(['/questions']);
    }

    votesBarStyle(votes: number): {} {
        const width = !this.maxVotes ? 0 : 100 * (votes / this.maxVotes);
        return { width: width + '%' };
    }
}

