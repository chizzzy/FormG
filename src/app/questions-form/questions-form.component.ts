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
  public image = '';
  public imgForSingle = '../../assets/icons/radio-on-button.svg';
  public imgForMultiple = '../../assets/icons/checked.svg';
  public imgForText = '../../assets/icons/edit-text.svg';
  constructor(private questionService: QuestionService, private questionTypeService: QuestionTypeService) { }

  ngOnInit() {
    this.questionTypeService.questionTypeBar$.subscribe(typeBarState => {
      this.typeBarState = typeBarState;
    });
  }
  addQuestion(e) {
    const questionType = e.target.textContent;
    if (questionType === 'One answer') {
      this.image = this.imgForSingle;
    } else if (questionType === 'Multiple answers') {
      this.image = this.imgForMultiple;
    } else if (questionType === 'Text') {
      this.image = this.imgForText;
    }
    const currentQuestion = this.questionService.addElement(this.questions);
    currentQuestion.image = this.image;
    this.questions.push(currentQuestion);
    this.closeQuestionTypeBar();
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
  openMultipleBar() {
    this.questionTypeService.openMultipleBar();
  }
  openSingleBar() {
    this.questionTypeService.openSingleBar();
  }
  openTextBar() {
    this.questionTypeService.openTextBar();
  }
}
