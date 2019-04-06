import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PollsListComponent} from '../polls-list/polls-list.component';
import {FormsViewComponent} from './components/forms-view/forms-view.component';

const routes: Routes = [
  {
    path: '', component: PollsListComponent,
  },
  {
    path: ':id', pathMatch: 'full', component: FormsViewComponent
  },
  {path: 'create', component: FormsViewComponent}

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
