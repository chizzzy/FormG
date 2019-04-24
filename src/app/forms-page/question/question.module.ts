import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CreateQuestionComponent} from './components/create-question/create-question.component';
import {QuestionsFormComponent} from './components/questions-form/questions-form.component';
import {PollsListService} from './services/polls-list.service';
import {QuestionService} from './services/question.service';
import {QuestionTypeService} from './services/question-type.service';
import {SharedModule} from '../../shared/shared.module';
import {QuestionRoutingModule} from './question-routing.module';
import {FormsViewComponent} from './components/forms-view/forms-view.component';
import {ContentTabComponent} from '../views/content-tab/content-tab.component';
import {NavbarComponent} from '../views/navbar/navbar.component';
import {PollsListComponent} from '../polls-list/polls-list.component';
import {VoteFormComponent} from './components/vote-form/vote-form.component';

@NgModule({
  declarations: [
    CreateQuestionComponent,
    QuestionsFormComponent,
    FormsViewComponent,
    ContentTabComponent,
    NavbarComponent,
    PollsListComponent,
    VoteFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    QuestionRoutingModule,
  ],
  providers: [PollsListService, QuestionService, QuestionTypeService]
})
export class QuestionModule {
}
