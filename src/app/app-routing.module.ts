import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {WelcomePageComponent} from './home/welcome-page/welcome-page.component';

const routes: Routes = [
  {
    path: '' , component: WelcomePageComponent
  },
  {
    path: 'polls', loadChildren: './forms-page/question/question.module#QuestionModule'
  }
];

@NgModule({
  imports: [
    CommonModule,
    [RouterModule.forRoot(routes)]
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
