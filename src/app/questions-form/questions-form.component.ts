import {Component, Input, OnInit} from '@angular/core';
import {QuestionService} from '../question.service';
import {QuestionTypeService} from '../question-type.service';
import {FormControl, FormGroup} from '@angular/forms';
import {PollsListService} from '../polls-list.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions-form.component.html',
  styleUrls: ['./questions-form.component.scss']
})
export class QuestionsFormComponent implements OnInit {
  public polls;
  public pollData;
  public localStoragePollData;
  public questions;
  public typeBarState;
  public image = '';
  public pollsHeader = new FormGroup({
    title: new FormControl(''),
    description: new FormControl('')
  });
  public imgForSingle = '../../assets/icons/radio-on-button.svg';
  public imgForMultiple = '../../assets/icons/checked.svg';
  public imgForText = '../../assets/icons/edit-text.svg';
  public questionsData = [];

  constructor(private questionService: QuestionService, private questionTypeService: QuestionTypeService,
              private pollsListService: PollsListService) {
  }

  ngOnInit() {
    this.pollsListService.pollData$.subscribe(pollData => {
      this.pollData = pollData;
    });
    this.localStoragePollData = JSON.parse(localStorage.getItem('poll'));
    if (this.localStoragePollData === null) {
      this.questions = [];
      this.localStoragePollData = [];
    } else {
      this.questions = this.localStoragePollData.questions;
      this.pollsHeader.setValue({
        title: this.localStoragePollData.pollTitle,
        description: this.localStoragePollData.pollDescription
      });
    }

    this.questionTypeService.questionTypeBar$.subscribe(typeBarState => {
      this.typeBarState = typeBarState;
    });
  }

  addPollToLocalStorage(questionData) {
    let found = false;
    if (this.questionsData.length === 0) {
      this.questionsData.push(questionData);
    } else {
      this.questionsData = this.questionsData.map(question => {
        if (question.id === questionData.id) {
          found = true;
          return questionData;
        } else {
          return question;
        }
      });
      if (found === false) {
        this.questionsData.push(questionData);
      }
    }
    localStorage.setItem('poll', JSON.stringify({
      pollTitle: this.pollsHeader.value.title,
      pollDescription: this.pollsHeader.value.description,
      questions: this.questionsData,
    }));
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
    const pollData = JSON.parse(localStorage.getItem('poll'));
    pollData.questions = pollData.questions.filter(question => {
      if (currentQuestion.id !== question.id) {
        return question;
      }
    });
    localStorage.setItem('poll', JSON.stringify(pollData));
  }

  openQuestionTypeBar() {
    this.questionTypeService.openQuestionTypeBar();
  }

  closeQuestionTypeBar() {
    this.questionTypeService.closeQuestionTypeBar();
  }
}
