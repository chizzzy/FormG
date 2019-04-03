import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {WelcomePageComponent} from './welcome-page/welcome-page.component';
import {FormsPageComponent} from './forms-page/forms-page.component';
import {PollsListComponent} from './polls-list/polls-list.component';

const routes: Routes = [
  {
    path: '', component: WelcomePageComponent
  },
  {
    path: 'polls', component: PollsListComponent,
    children: [
      {
        path: ':id', component: FormsPageComponent,
      },
    ]
  },
  {path: 'create', component: FormsPageComponent}
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
