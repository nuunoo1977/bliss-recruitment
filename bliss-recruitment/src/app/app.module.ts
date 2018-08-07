import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { MatButtonModule, MatProgressSpinnerModule } from '@angular/material';

import { LoadingScreenComponent } from './components/loading-screen/loading-screen.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { QuestionDetailComponent } from './components/question-detail/question-detail.component';


@NgModule({
    declarations: [
        AppComponent,
        LoadingScreenComponent,
        QuestionsComponent,
        QuestionDetailComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        MatButtonModule,
        MatProgressSpinnerModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
