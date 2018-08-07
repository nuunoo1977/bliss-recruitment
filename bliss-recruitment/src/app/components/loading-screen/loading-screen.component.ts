import { Component, AfterViewInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
    selector: 'app-loading-screen',
    templateUrl: './loading-screen.component.html',
    styleUrls: ['./loading-screen.component.scss']
})
export class LoadingScreenComponent implements AfterViewInit {

    showSpinner = true;

    constructor(
        private http: HttpClient,
        private router: Router
    ) {
    }

    ngAfterViewInit() {
        this.checkServerHealth();
    }

    checkServerHealth() {
        this.showSpinner = true;
        this.http.get('https://private-bbbe9-blissrecruitmentapi.apiary-mock.com/health')
            .subscribe((result: any) => {
                if(result && result.status == 'OK') {
                    this.router.navigate(['/questions']);
                }
                else {
                    this.showSpinner = false;    
                }
            }, () => {
                this.showSpinner = false;
            });
    }

}

