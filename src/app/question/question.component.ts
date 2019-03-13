import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {QuestionService} from '../question.service';
import {interval} from 'rxjs';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  public options = [];
  @Output() deletedElement = new EventEmitter();
  @Output() questionTitle = new EventEmitter();
  @Input() questionType;
  public image;
  public optionFormGroup = new FormGroup({});
  public interval$ = interval(5000);
  public questionTitleForm = new FormControl('');
  constructor(private questionService: QuestionService) {
    this.interval$.subscribe(() => {
      localStorage.setItem('options', JSON.stringify(this.optionFormGroup.value));
      this.questionTitle.emit(this.questionTitleForm.value);
    });
  }

  ngOnInit() {
  }

  addOption() {
    const currentOption = this.questionService.addOption(this.options);
    this.options.push(currentOption);
    this.optionFormGroup.addControl(currentOption.id, new FormControl(''));
    console.log(this.optionFormGroup);
  }

  deleteQuestion() {
    this.deletedElement.emit();
  }

  deleteOption(currentElement, options) {
    this.options = this.questionService.deleteElement(currentElement, options);
    return this.options;
  }

}
