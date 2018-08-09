import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionsService } from '../../shared/questions.service';

@Component({
    selector: 'app-loading-screen',
    templateUrl: './loading-screen.component.html',
    styleUrls: ['./loading-screen.component.scss']
})
export class LoadingScreenComponent implements AfterViewInit {

    serverError = false;

    constructor(
        private router: Router,
        private questionsService: QuestionsService
    ) {
    }

    ngAfterViewInit() {
        this.checkServerHealth();
    }

    checkServerHealth() {
        this.serverError = false;
        this.questionsService.checkServerHealth()
            .subscribe(
                (result) => {
                    if (result) {
                        this.router.navigate(['/questions']);
                    }
                    this.serverError = !result;
                }
            );
    }

}

