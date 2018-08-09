import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { QuestionsService } from '../../shared/questions.service';
import { Question } from '../../shared/question';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ShareScreenComponent, ShareScreenOptions } from '../share-screen/share-screen.component';

@Component({
    selector: 'app-questions',
    templateUrl: './questions.component.html',
    styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit, AfterViewInit {

    private questionsLimitByRequest = 10;

    questions: Question[] = [];
    allQuestionsLoaded = false;

    @ViewChild('searchInput') searchInput: ElementRef;
    searchInputValue = null;
    currentAppliedFilter = null;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private questionsService: QuestionsService,
        private dialog: MatDialog,
    ) {
    }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            if (params['question_id']) {
                this.router.navigate(['/questions', params['question_id']]);
            }
            else {
                if (params.hasOwnProperty('question_filter')) {
                    this.searchInputValue = params['question_filter'];
                }
                if (this.searchInputValue) {
                    this.onSearchSubmit();
                }
                else {
                    this.loadNextQuestions();
                }
            }
        });
    }

    ngAfterViewInit() {
        if (this.searchInputValue == '') {
            this.searchInput.nativeElement.focus();
        }
    }

    loadNextQuestions(): void {
        this.questionsService.getQuestions(this.questionsLimitByRequest, this.questions.length, this.currentAppliedFilter)
            .subscribe(
                (questions) => {
                    this.questions = this.questions.concat(questions);
                    this.allQuestionsLoaded = questions.length < this.questionsLimitByRequest;
                }
            );
    }

    loadSearchQuestions(searchValue: string): void {
        this.questionsService.getQuestions(this.questionsLimitByRequest, 0, searchValue)
            .subscribe(
                (questions) => {
                    this.questions = questions;
                    this.allQuestionsLoaded = questions.length < this.questionsLimitByRequest;
                    this.currentAppliedFilter = searchValue;
                }
            );
    }


    onSearchSubmit(f?: any, event?: Event) {
        if(event) {
            event.preventDefault();
        } 
        if (this.searchInputValue) {
            this.loadSearchQuestions(this.searchInputValue);
        }
    }

    onSearchCancel() {
        this.questions = [];
        this.currentAppliedFilter = null;
        this.loadNextQuestions();
    }

    shareScreen() {      
        let options : ShareScreenOptions = {
            title: "Share search result",
            link: "/questions?question_filter=" + encodeURIComponent(this.currentAppliedFilter)
        };
        this.dialog.open(ShareScreenComponent, {
            data: options,
            disableClose: false,
        });
    }
}
