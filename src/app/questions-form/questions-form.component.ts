import {Component, OnInit} from '@angular/core';
import {QuestionService} from '../question.service';
import {QuestionTypeService} from '../question-type.service';
import {FormControl, FormGroup} from '@angular/forms';
import {PollsListService} from '../polls-list.service';
import {ActivatedRoute, Router} from '@angular/router';
import {interval} from 'rxjs';

@Component({
  selector: 'app-questions',
  templateUrl: './questions-form.component.html',
  styleUrls: ['./questions-form.component.scss']
})
export class QuestionsFormComponent implements OnInit {
  public title;
  public description;
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
              private pollsListService: PollsListService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.questionTypeService.questionTypeBar$.subscribe(typeBarState => {
      this.typeBarState = typeBarState;
    });
    const pollId = this.router.url.match(/\d+/);
    if (pollId === null) {
      this.pollData = {id: 1};
      this.questions = [];
      return;
    }
    this.localStoragePollData = JSON.parse(localStorage.getItem('poll')).filter(poll => poll.id === parseInt(pollId[0], 10));
    if (this.localStoragePollData.length > 0) {
      this.pollData = this.localStoragePollData;
      this.initializePollData(this.pollData[0]);
      return;
    }
    this.localStoragePollData = JSON.parse(localStorage.getItem('poll'));
    this.pollData = this.route.snapshot.data.resolveData;
    this.initializePollData(this.pollData[0]);
  }


  initializePollData(pollData) {
    this.questions = pollData.questions;
    this.title = pollData.pollTitle;
    this.description = pollData.pollDescription;
    this.pollsHeader.setValue({
      title: pollData.pollTitle,
      description: pollData.pollDescription
    });
  }
  addPollToLocalStorage(questionData) {
    const localStorageData = JSON.parse(localStorage.getItem('poll'));
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
    const updatedPolls = localStorageData.map(poll => {
        if (this.pollData.id === poll.id) {
          return {
            id: poll.id,
            pollTitle: this.pollsHeader.value.title,
            pollDescription: this.pollsHeader.value.description,
            questions: this.questionsData
          };
        } else {
          return poll;
        }
    });
    localStorage.setItem('poll', JSON.stringify(updatedPolls));
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
    let localStorageData = JSON.parse(localStorage.getItem('poll'));
    const pollData = localStorageData.filter(poll => poll.id === this.pollData.id)[0];
    pollData.questions = pollData.questions.filter(question => {
      if (currentQuestion.id !== question.id) {
        return question;
      }
    });
    localStorageData = localStorageData.map(poll => {
      if (poll.id === pollData.id) {
        return pollData;
      } else {
        return poll;
      }
    });
    localStorage.setItem('poll', JSON.stringify(localStorageData));
  }

  openQuestionTypeBar() {
    this.questionTypeService.openQuestionTypeBar();
  }

  closeQuestionTypeBar() {
    this.questionTypeService.closeQuestionTypeBar();
  }
}
