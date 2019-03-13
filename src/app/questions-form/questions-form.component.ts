import {Component, OnInit} from '@angular/core';
import {QuestionService} from '../question.service';
import {QuestionTypeService} from '../question-type.service';
import {interval} from 'rxjs';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-questions',
  templateUrl: './questions-form.component.html',
  styleUrls: ['./questions-form.component.scss']
})
export class QuestionsFormComponent implements OnInit {
  public questions = [];
  public typeBarState;
  public image = '';
  public questionsTitleGroup = new FormGroup({});
  pollsData = new FormGroup({
    title: new FormControl(''),
    description: new FormControl('')
  });
  public imgForSingle = '../../assets/icons/radio-on-button.svg';
  public imgForMultiple = '../../assets/icons/checked.svg';
  public imgForText = '../../assets/icons/edit-text.svg';
  public interval$ = interval(5000);
  constructor(private questionService: QuestionService, private questionTypeService: QuestionTypeService) {
    this.interval$.subscribe(() => {
      localStorage.setItem('pollsData', JSON.stringify(this.pollsData.value));
    });
  }

  ngOnInit() {
    this.questionTypeService.questionTypeBar$.subscribe(typeBarState => {
      this.typeBarState = typeBarState;
    });
  }
  addQuestionsTitleToLocalStorage(title, question) {
    // const gg = question.id;
    // const result = {
    //   gg: title
    // };
    // this.questionsTitleGroup.addControl(result, new FormControl());
  }
  checkType(questionType) {
    if (questionType === 'One answer') {
      this.image = this.imgForSingle;
    } else if (questionType === 'Multiple answers') {
      this.image = this.imgForMultiple;
    } else if (questionType === 'Text') {
      this.image = this.imgForText;
    }
  }

  addQuestion(e) {
    const questionType = e.target.textContent;
    this.checkType(questionType);
    const currentQuestion = this.questionService.addQuestion(this.questions);
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
}
