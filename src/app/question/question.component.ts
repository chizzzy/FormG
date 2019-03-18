import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {QuestionService} from '../question.service';
import {interval} from 'rxjs';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit, OnDestroy {
  public options = [];
  @Output() deletedElement = new EventEmitter();
  @Output() questionData = new EventEmitter();
  @Input() questionType;
  @Input() currentQuestionId;
  public image;
  public optionsFormGroup = new FormGroup({});
  public questionFormGroup = new FormGroup({
    title: new FormControl(''),
    options: this.optionsFormGroup
  });
  public interval$ = interval(5000);
  public intervalSubscription;

  constructor(private questionService: QuestionService) {
    this.intervalSubscription =
      this.interval$.subscribe(() => {
        const outputQuestion = {id: this.currentQuestionId, value: this.questionFormGroup.value};
        this.questionData.emit(outputQuestion);
      });
  }

  ngOnDestroy() {
    this.intervalSubscription.unsubscribe();
  }

  ngOnInit() {
  }

  addOption() {
    const currentOption = this.questionService.addOption(this.options);
    this.options.push(currentOption);
    this.optionsFormGroup.addControl(currentOption.id, new FormControl(''));
  }

  deleteQuestion() {
    this.deletedElement.emit();
  }

  deleteOption(currentElement, options) {
    this.options = this.questionService.deleteElement(currentElement, options);
    return this.options;
  }

}
