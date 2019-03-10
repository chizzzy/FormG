import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {WelcomePageComponent} from './welcome-page/welcome-page.component';
import {FormsPageComponent} from './forms-page/forms-page.component';
const routes: Routes = [
  {
    path: '', component: WelcomePageComponent
  },
  {
    path: 'forms', component: FormsPageComponent
  }
];
@NgModule({
  imports: [
    CommonModule,
    [RouterModule.forRoot(routes) ]
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
