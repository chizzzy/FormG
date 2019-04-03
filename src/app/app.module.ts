import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {WelcomePageComponent} from './welcome-page/welcome-page.component';
import {AppRoutingModule} from './app-routing.module';
import {FormsPageComponent} from './forms-page/forms-page.component';
import {ContentTabComponent} from './content-tab/content-tab.component';
import {SharedModule} from './shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NavbarComponent} from './navbar/navbar.component';
import {QuestionsFormComponent} from './questions-form/questions-form.component';
import {QuestionComponent} from './question/question.component';
import {PollsListComponent} from './polls-list/polls-list.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    FormsPageComponent,
    ContentTabComponent,
    NavbarComponent,
    QuestionsFormComponent,
    QuestionComponent,
    PollsListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
