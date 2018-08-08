import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Question } from './question';
import { QuestionUpdate } from './question-update';
import { GetQuestionsParameters } from './get-questions-parameters';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class QuestionsService {

    private apiUrl = 'https://private-bbbe9-blissrecruitmentapi.apiary-mock.com/';

    constructor(
        private http: HttpClient
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
        // .pipe(
        //     tap(questions => this.log('fetched questions')),
        //     catchError(this.handleError('getQuestions', []))
        // );
    }


}
