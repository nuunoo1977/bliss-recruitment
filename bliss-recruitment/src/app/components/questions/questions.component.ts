import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { QuestionsService } from '../../shared/questions.service';
import { Question } from '../../shared/models/question';
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

    questions: Question[] = null; // null -> not initialized, [] -> no results
    allQuestionsLoaded = false;

    @ViewChild('searchInput') searchInput: ElementRef;
    searchInputValue = null;
    currentAppliedFilter = null;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private questionsService: QuestionsService,
        private dialog: MatDialog,
        private changeDetectorRef: ChangeDetectorRef
    ) {
    }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            if (params['question_id']) {
                this.router.navigate(['/questions', params['question_id']]);
            } else {
                if (params.hasOwnProperty('question_filter')) {
                    this.searchInputValue = params['question_filter'];
                }
                if (this.searchInputValue) {
                    this.onSearchSubmit();
                } else {
                    this.loadNextQuestions();
                }
            }
        });
    }

    ngAfterViewInit() {
        if (this.searchInputValue === '') {
            this.searchInput.nativeElement.focus();
        }
        this.changeDetectorRef.detectChanges();
    }

    loadNextQuestions(): void {
        this.questionsService.getQuestions(
            this.questionsLimitByRequest,
            this.questions ? this.questions.length : 0, this.currentAppliedFilter
        ).subscribe(
            (questions) => {
                this.questions = this.questions ? this.questions.concat(questions) : questions;
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
        if (event) {
            event.preventDefault();
        }
        if (this.searchInputValue) {
            this.loadSearchQuestions(this.searchInputValue);
        }
    }

    onSearchCancel() {
        this.questions = null;
        this.currentAppliedFilter = null;
        this.loadNextQuestions();
    }

    shareScreen() {
        const options: ShareScreenOptions = {
            title: 'Share search result',
            link: '/questions?question_filter=' + encodeURIComponent(this.currentAppliedFilter)
        };
        this.dialog.open(ShareScreenComponent, {
            data: options,
            disableClose: false,
        });
    }
}
