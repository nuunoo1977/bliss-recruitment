import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { QuestionsService } from '../../shared/questions.service';
import { Question } from '../../shared/question';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionUpdate } from '../../shared/question-update';
import { NotificationsService } from '../../shared/notifications.service';
import { ShareScreenOptions, ShareScreenComponent } from '../share-screen/share-screen.component';
import { MatDialog } from '@angular/material';


@Component({
    selector: 'app-question-detail',
    templateUrl: './question-detail.component.html',
    styleUrls: ['./question-detail.component.scss']
})
export class QuestionDetailComponent implements OnInit {

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private questionsService: QuestionsService,
        private notificationsService: NotificationsService,
        private dialog: MatDialog
    ) {
    }

    private questionId: number;
    private question: Question = null;
    private maxVotes = 0;
    public userHasVoted = false;

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

    voteChoice(choiceIndex: number) {
        // TODO: maybe use deep copying and update votes after
        const questionUpdate: QuestionUpdate = (({ id, question, image_url, thumb_url, choices }) =>
            ({ id, question, image_url, thumb_url, choices }))(this.question);
        questionUpdate.choices = [];
        this.question.choices.forEach((item, index) => {
            questionUpdate.choices.push({ choice: item.choice, votes: (index === choiceIndex ? 1 : 0) });
        });
        this.questionsService.updateQuestion(questionUpdate).subscribe(
            (question) => {
                if (question) {
                    // TODO: check with client what we wants to show after vote. For now we update question detail and disable vote buttons)
                    this.userHasVoted = true;
                    this.notificationsService.newSucess('Vote submitted');
                    this.loadQuestion();
                }
            }
        );
    }

    shareScreen() {
        const options: ShareScreenOptions = {
            title: 'Share question ' + this.questionId,
            link: '/questions?question_id=' + this.questionId
        };
        this.dialog.open(ShareScreenComponent, {
            data: options,
            disableClose: false,
        });
    }
}

