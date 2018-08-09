import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptor } from './shared/loader-interceptor';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatProgressSpinnerModule, MatSnackBarModule } from '@angular/material';

import { LoaderComponent } from './components/loader/loader.component';
import { InternetConnectionAlertComponent } from './components/internet-connection-alert/internet-connection-alert.component';
import { LoadingScreenComponent } from './components/loading-screen/loading-screen.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { QuestionDetailComponent } from './components/question-detail/question-detail.component';
import { ShareScreenComponent } from './components/share-screen/share-screen.component';

@NgModule({
    declarations: [
        AppComponent,
        InternetConnectionAlertComponent,
        LoaderComponent,
        LoadingScreenComponent,
        QuestionsComponent,
        QuestionDetailComponent,
        ShareScreenComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatButtonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatSnackBarModule
    ],
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: LoaderInterceptor,
        multi: true,
      }],
      entryComponents: [
        ShareScreenComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
