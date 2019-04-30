import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {QuestionService} from '../../services/question.service';
import {interval} from 'rxjs';
import {FormControl, FormGroup} from '@angular/forms';
import {PollsService} from '../../../../core/polls.service';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.scss']
})
export class CreateQuestionComponent implements OnInit, OnDestroy {
  public options = [];
  @Output() deletedElement = new EventEmitter();
  @Output() questionData = new EventEmitter();
  @Input() currentQuestion;
  public image;
  public title;
  public optionsFormGroup = new FormGroup({});
  public questionFormGroup = new FormGroup({
    title: new FormControl(''),
    options: this.optionsFormGroup
  });
  public interval$ = interval(3000);
  public intervalSubscription;

  constructor(private questionService: QuestionService) {
  }

  ngOnInit(): void {
        if (!!this.currentQuestion) {
          if (this.currentQuestion.hasOwnProperty('options')) {
            this.title = this.currentQuestion.title;
            this.options = this.currentQuestion.options;
            if (this.options.length > 0) {
              this.options.forEach(option => {
                this.optionsFormGroup.addControl(option.id, new FormControl(''));
                this.optionsFormGroup.patchValue({[option.id]: option.title});
                this.questionFormGroup.patchValue({title: this.title});
              });
              }
            }
          } else {}
    this.intervalSubscription =
      this.interval$.subscribe(() => {
        const optionsObject  = this.questionFormGroup.value.options;
        const optionsArray = [];
        for (const key in optionsObject) {
          if (optionsObject.hasOwnProperty(key)) {
            optionsArray.push({id: key, title: optionsObject[key]});
          }
        }
        console.log(optionsArray);
        const outputQuestion = {
          id: this.currentQuestion.id,
          title: this.questionFormGroup.value.title,
          options: optionsArray,
          image: this.currentQuestion.image
        };
        console.log(outputQuestion);
        this.questionData.emit(outputQuestion);
      });
  }

  ngOnDestroy() {
    this.intervalSubscription.unsubscribe();
  }

  addOption(): void {
    const currentOption = this.questionService.addOption(this.options);
    this.options.push(currentOption);
    this.optionsFormGroup.addControl(currentOption.id, new FormControl(''));
  }

  deleteQuestion(): void {
    this.deletedElement.emit();
  }

  deleteOption(currentElement, options) {
    this.optionsFormGroup.removeControl(currentElement.id);
    this.options = this.questionService.deleteElement(currentElement, options, this.currentQuestion.id);
    return this.options;
  }

}
