import {Component, OnInit} from '@angular/core';
import {QuestionService} from '../../services/question.service';
import {QuestionTypeService} from '../../services/question-type.service';
import {FormControl, FormGroup} from '@angular/forms';
import {PollsListService} from '../../services/polls-list.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-questions',
  templateUrl: './questions-form.component.html',
  styleUrls: ['./questions-form.component.scss']
})
export class QuestionsFormComponent implements OnInit {
  public title: string;
  public description: string;
  public polls;
  public pollData;
  public localStoragePollData;
  public questions;
  public typeBarState;
  public image = '';
  public pollsHeaderFormGroup = new FormGroup({
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
    if (pollId !== null) {
      this.localStoragePollData = JSON.parse(localStorage.getItem('poll')).filter(poll => poll.id === parseInt(pollId[0], 10));
      if (this.localStoragePollData.length > 0) {
        this.pollData = this.localStoragePollData[0];
        this.initializePollData(this.pollData);
        return;
      }
    }
    this.questions = [];
    this.pollsListService.pollData$.subscribe(poll => {
      this.pollData = poll;
    });
  }


  initializePollData(pollData): void {
    this.questions = pollData.questions;
    this.title = pollData.pollTitle;
    this.description = pollData.pollDescription;
    this.pollsHeaderFormGroup.setValue({
      title: pollData.pollTitle,
      description: pollData.pollDescription
    });
  }

  addPollToLocalStorage(questionData) {
    const localStorageData = JSON.parse(localStorage.getItem('poll'));
    if (this.questionsData.length === 0) {
      this.questionsData.push(questionData);
    } else {
      this.questionsData = this.questionsData.map(question => question.id === questionData.id ? questionData : question);
      if (this.questionsData.length === 0) {
        this.questionsData.push(questionData);
      }
    }
    const updatedPolls = localStorageData.map(poll => {
      if (this.pollData.id === poll.id) {
        return {
          id: poll.id,
          pollTitle: this.pollsHeaderFormGroup.value.title || 'untitled',
          pollDescription: this.pollsHeaderFormGroup.value.description,
          questions: this.questionsData
        };
      }
      return poll;
    });
    localStorage.setItem('poll', JSON.stringify(updatedPolls));
  }

  checkType(questionType): void {
    if (questionType === 'One answer') {
      this.image = this.imgForSingle;
    } else if (questionType === 'Multiple answers') {
      this.image = this.imgForMultiple;
    } else if (questionType === 'Text') {
      this.image = this.imgForText;
    }
  }

  addQuestion(e): void {
    const questionType = e.target.textContent;
    this.checkType(questionType);
    const currentQuestion = this.questionService.addQuestion(this.questions);
    currentQuestion.image = this.image;
    this.questions.push(currentQuestion);
    this.closeQuestionTypeBar();
  }

  deleteQuestion(currentQuestion, questionsArray): void {
    this.questions = this.questionService.deleteElement(currentQuestion, questionsArray);
    let localStorageData = JSON.parse(localStorage.getItem('poll'));
    const pollData = localStorageData.filter(poll => poll.id === this.pollData.id)[0];
    pollData.questions = pollData.questions.filter(question => currentQuestion.id !== question.id);

    localStorageData = localStorageData.map(poll => poll.id === pollData.id ? pollData : poll);

    localStorage.setItem('poll', JSON.stringify(localStorageData));
  }

  openQuestionTypeBar(): void {
    this.questionTypeService.openQuestionTypeBar();
  }

  closeQuestionTypeBar(): void {
    this.questionTypeService.closeQuestionTypeBar();
  }
}
