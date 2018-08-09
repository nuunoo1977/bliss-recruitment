import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoadingScreenComponent } from './components/loading-screen/loading-screen.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { QuestionDetailComponent } from './components/question-detail/question-detail.component';

const routes: Routes = [
    { path: '', component: LoadingScreenComponent, pathMatch: 'full' },
    { path: 'questions', component: QuestionsComponent },
    { path: 'questions/:id', component: QuestionDetailComponent },
    { path: '**', component: LoadingScreenComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }