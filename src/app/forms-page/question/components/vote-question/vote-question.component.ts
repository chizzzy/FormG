import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {QuestionService} from '../../services/question.service';

@Component({
  selector: 'app-vote-question',
  templateUrl: './vote-question.component.html',
  styleUrls: ['./vote-question.component.scss']
})
export class VoteQuestionComponent implements OnInit {
  @Input() question;
  @Input() questionForm;
  constructor() { }

  ngOnInit() {
    this.question.options.forEach(option => {
      this.questionForm.addControl(option.id, new FormControl(''));
    } );
  }
  setTypeOfAnswer(questionType) {
    if (questionType === 'One answer') {
      return 'radio';
    } else if (questionType === 'Multiple answers') {
      return 'checkbox';
    } else {
      return 'text';
    }
  }
}
