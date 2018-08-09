import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoaderService } from '../../shared/loader.services';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy {

    show = false;
    private subscription: Subscription;

    constructor(
        private loaderService: LoaderService
    ) {
     }

    ngOnInit() {
        this.subscription = this.loaderService.loaderShow
            .subscribe((show: boolean) => {
                this.show = show;
            });
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
