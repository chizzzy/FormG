import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PollsListComponent} from '../polls-list/polls-list.component';
import {FormsViewComponent} from './components/forms-view/forms-view.component';
import {VoteFormComponent} from './components/vote-form/vote-form.component';

const routes: Routes = [
  {
    path: '', component: PollsListComponent,
  },
  {
    path: ':id', pathMatch: 'full', component: FormsViewComponent
  },
  {path: 'create', component: FormsViewComponent},
  {path: ':id/vote', pathMatch: 'full', component: VoteFormComponent}

];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class QuestionRoutingModule {
}
