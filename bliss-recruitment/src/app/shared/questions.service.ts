import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap, finalize } from 'rxjs/operators';

import { NotificationsService } from '../shared/notifications.service';

import { Question } from './question';
import { QuestionUpdate } from './question-update';
import { GetQuestionsParameters } from './get-questions-parameters';
import { LoaderService } from './loader.services';

const httpPutOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class QuestionsService {

    private apiUrl = 'https://private-bbbe9-blissrecruitmentapi.apiary-mock.com/';

    constructor(
        private http: HttpClient,
        private notificationsService: NotificationsService,
        private loaderService: LoaderService
    ) { }

    getQuestions(limit: number, offset: number, filter?: string): Observable<Question[]> {
        let parameters: GetQuestionsParameters;
        parameters = {
            limit: String(limit),
            offset: String(offset),
        }
        if (filter) {
            parameters.filter = filter;
        }
        return this.http.get<Question[]>(`${this.apiUrl}/questions`, { params: <any>parameters })
            .pipe(
                catchError(this.handleError<Question[]>('get questions', <Question[]>[])),
        );
    }

    checkServerHealth(): Observable<boolean> {
        return this.http.get<any>(`${this.apiUrl}/health`)
            .pipe(
                map(result => {
                    if (result && result.status == 'OK') {
                        return true;
                    }
                    return false;
                }),
                catchError(this.handleError<boolean>('check server health', false,false))
            );
    }

    getQuestion(questionId: number): Observable<Question> {
        return this.http.get<Question>(`${this.apiUrl}/questions/${questionId}`)
            .pipe(
                map(result => {
                    if (!result || result.id != questionId) {
                        this.showErrorToUser("Error when getting question");
                        return null;
                    }
                    return result;
                }),
                catchError(this.handleError<Question>('get question', null))
            );
    }

    updateQuestion(question: QuestionUpdate): Observable<Question> {
        return this.http.put<Question>(`${this.apiUrl}/questions/${question.id}`, question, httpPutOptions)
            .pipe(
                map(result => {
                    if (!result || result.id != question.id) {
                        //TODO: other checkings (if choice updated was the one we sent, ...)
                        this.showErrorToUser("Error when updating question");
                        return null;
                    }
                    return result;
                }),
                catchError(this.handleError<Question>('update question', null))
            );
    }

    private handleError<T>(context: string, result?: T, notifyUser: boolean = true) {
        return (error: any): Observable<T> => {
           
            console.error("Error in " + context);
            if(notifyUser) {
                this.showErrorToUser("Error in " + context);
            }
            return of(result as T);
        };
    }

    private showErrorToUser(msg: string) {
        this.notificationsService.newError(msg);
    }

}
