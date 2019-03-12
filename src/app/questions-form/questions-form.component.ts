import { Component, OnInit } from '@angular/core';
import {QuestionService} from '../question.service';
import {QuestionTypeService} from '../question-type.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions-form.component.html',
  styleUrls: ['./questions-form.component.scss']
})
export class QuestionsFormComponent implements OnInit {
  public questions = [];
  public typeBarState;
  constructor(private questionService: QuestionService, private questionTypeService: QuestionTypeService) { }

  ngOnInit() {
    this.questionTypeService.questionTypeBar$.subscribe(typeBarState => {
      this.typeBarState = typeBarState;
    });
  }
  addQuestion() {
    const currentQuestion = this.questionService.addElement(this.questions);
    this.questions.push(currentQuestion);
  }
  deleteQuestion(currentQuestion, questionsArray) {
    this.questions = this.questionService.deleteElement(currentQuestion, questionsArray);
  }
  openQuestionTypeBar() {
    this.questionTypeService.openQuestionTypeBar();
  }
  closeQuestionTypeBar() {
    this.questionTypeService.closeQuestionTypeBar();
  }
}
