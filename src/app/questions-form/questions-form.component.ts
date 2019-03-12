import { Component, OnInit } from '@angular/core';
import {QuestionService} from '../question.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions-form.component.html',
  styleUrls: ['./questions-form.component.scss']
})
export class QuestionsFormComponent implements OnInit {
  public questions = [];
  constructor(private questionService: QuestionService) { }

  ngOnInit() {
  }
  addQuestion() {
    const currentQuestion = this.questionService.addElement(this.questions);
    this.questions.push(currentQuestion);
  }
  deleteQuestion(currentQuestion, questionsArray) {
    this.questions = this.questionService.deleteElement(currentQuestion, questionsArray);
  }
}
