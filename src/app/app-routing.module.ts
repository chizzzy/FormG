import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {WelcomePageComponent} from './welcome-page/welcome-page.component';
import {FormsPageComponent} from './forms-page/forms-page.component';
import {PollsListComponent} from './polls-list/polls-list.component';
import {PollResolver} from './poll-resolver';

const routes: Routes = [
  {
    path: '', component: WelcomePageComponent
  },
  {
    path: 'polls', component: PollsListComponent,
  },
  {
    path: 'polls/:id', component: FormsPageComponent, resolve: {resolveData: PollResolver}
  },
  {path: 'polls/create', component: FormsPageComponent, resolve: {resolveData: PollResolver}}

];

@NgModule({
  imports: [
    CommonModule,
    [RouterModule.forRoot(routes)]
  ],
  exports: [RouterModule],
  providers: [PollResolver]
})

export class AppRoutingModule {
}
