import {Component, OnDestroy, OnInit} from '@angular/core';
import {QuestionService} from '../../services/question.service';
import {QuestionTypeService} from '../../services/question-type.service';
import {FormControl, FormGroup} from '@angular/forms';
import {PollsListService} from '../../services/polls-list.service';
import {ActivatedRoute} from '@angular/router';
import {PollsService} from '../../../../core/polls.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions-form.component.html',
  styleUrls: ['./questions-form.component.scss']
})
export class QuestionsFormComponent implements OnInit, OnDestroy {
  public subscription;
  public title: string;
  public description: string;
  public pollData;
  public questions;
  public typeBarState;
  public pollsHeaderFormGroup = new FormGroup({
    title: new FormControl(''),
    description: new FormControl('')
  });


  constructor(private questionService: QuestionService, private questionTypeService: QuestionTypeService,
              private pollsListService: PollsListService, private route: ActivatedRoute, private pollsService: PollsService) {
  }

  ngOnInit() {
    this.questionTypeService.questionTypeBar$.subscribe(typeBarState => {
      this.typeBarState = typeBarState;
    });
    const pollId = this.route.snapshot.paramMap.get('id');
    if (pollId[0] === '_') {
      this.pollsService.getPollById(pollId).subscribe(response => {
        this.pollData = response[0];
        localStorage.setItem('poll', JSON.stringify(this.pollData));
        if (!!this.pollData) {
          if (!(this.pollData.hasOwnProperty('title'))) {
            this.initializePollData(null);
          } else {
            this.initializePollData(this.pollData);
          }
        }
      });
    } else {
      this.questions = [];
      this.subscription = this.pollsListService.pollData$.subscribe(poll => {
        this.pollData = poll;
      });
    }
  }

  ngOnDestroy(): void {
    if (!!this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  initializePollData(pollData): void {
    if (pollData === null) {
      this.questions = [];
      this.title = 'untitled';
      this.description = '';
      this.pollsHeaderFormGroup.setValue({
        title: this.title,
        description: this.description
      });
    } else {
      this.questions = pollData.questions;
      this.title = pollData.title;
      this.description = pollData.description;
      this.pollsHeaderFormGroup.setValue({
        title: pollData.title,
        description: pollData.description
      });
    }
  }

  addPollToLocalStorage(questionData) {
    let pollQuestions;
    if (this.pollData.hasOwnProperty('questions')) {
      pollQuestions = this.pollData.questions;
    } else {
      pollQuestions = [];
    }
    if (pollQuestions.length === 0 || (pollQuestions.find(question => question.id === questionData.id)) === undefined) {
      pollQuestions.push(questionData);
    } else {
      pollQuestions = pollQuestions.map(question => question.id === questionData.id ? questionData : question);
    }
    const updatedPoll = {
      id: this.pollData.id || this.pollsService.generateId(),
      title: this.pollsHeaderFormGroup.value.title || 'untitled',
      description: this.pollsHeaderFormGroup.value.description,
      questions: pollQuestions
    };
    console.log(updatedPoll);
    if (updatedPoll.hasOwnProperty('questions')) {
      this.pollsService.updatePollData(updatedPoll).subscribe();
    }
  }


  addQuestion(e): void {
    const questionType = e.target.textContent || e.target.alt;
    console.log(e);
    const currentQuestion = this.questionService.addQuestion(this.questions);
    currentQuestion.type = questionType;
    this.questions.push(currentQuestion);
    this.closeQuestionTypeBar();
  }

  deleteQuestion(currentQuestion, questionsArray): void {
    this.questions = this.questionService.deleteElement(currentQuestion, questionsArray, 'question');
    this.pollData.questions = this.pollData.questions.filter(question => currentQuestion.id !== question.id);
    localStorage.setItem('poll', JSON.stringify(this.pollData));
  }

  openQuestionTypeBar(): void {
    this.questionTypeService.openQuestionTypeBar();
  }

  copyLinkToVote() {
    const voteUrl = window.location.href + '/vote';
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = voteUrl;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  closeQuestionTypeBar(): void {
    this.questionTypeService.closeQuestionTypeBar();
  }
}
