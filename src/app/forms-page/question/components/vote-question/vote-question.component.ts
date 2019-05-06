import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-vote-question',
  templateUrl: './vote-question.component.html',
  styleUrls: ['./vote-question.component.scss']
})
export class VoteQuestionComponent implements OnInit {
  @Input() question;
  @Input() questionForm;
  constructor() {
  }

  ngOnInit() {

    this.question.options.forEach(option => {
      if (this.question.type === 'Text') {
        this.questionForm.addControl(option.id, new FormControl(''));
      } else {
        this.questionForm.addControl(option.id, new FormControl(false));
      }
    });
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

  onChange(event, optionId) {
    if (this.question.type === 'One answer') {
      for (const i in this.questionForm.value) {
        if (this.questionForm.value.hasOwnProperty(i)) {
          this.questionForm.patchValue({[i]: false});
        }
      }
      this.questionForm.patchValue({[optionId]: event.srcElement.checked});
    } else if (this.question.type === 'Multiple answers') {
      this.questionForm.patchValue({[optionId]: event.srcElement.checked});
    }
  }
}
