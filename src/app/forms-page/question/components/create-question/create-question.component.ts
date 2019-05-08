import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {QuestionService} from '../../services/question.service';
import {interval} from 'rxjs';
import {FormControl, FormGroup} from '@angular/forms';

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
  public canAddOption = true;
  public optionsFormGroup = new FormGroup({});
  public questionFormGroup = new FormGroup({
    title: new FormControl(''),
    options: this.optionsFormGroup
  });
  public interval$ = interval(3000);
  public intervalSubscription;
  public imgForSingle = '../../assets/icons/radio-on-button.svg';
  public imgForMultiple = '../../assets/icons/checked.svg';
  public imgForText = '../../assets/icons/edit-text.svg';

  constructor(private questionService: QuestionService) {
  }

  ngOnInit(): void {
    if (!!this.currentQuestion) {
      this.image = this.checkType(this.currentQuestion.type);
      this.checkAddOptionAvailability(this.currentQuestion);
      if (this.currentQuestion.hasOwnProperty('options')) {
        this.title = this.currentQuestion.title;
        this.options = this.currentQuestion.options;
        if (this.options.length > 0) {
          this.fillFormValues(this.options);
        }
      }
    }
    this.intervalSubscription =
      this.interval$.subscribe(() => {
        const optionsObject = this.questionFormGroup.value.options;
        if (Object.keys(optionsObject).length > 0 || this.currentQuestion.type === 'Text') {
          const outputQuestion = this.formQuestionToEmit(optionsObject);
          this.questionData.emit(outputQuestion);
        }
      });
  }

  ngOnDestroy() {
    this.intervalSubscription.unsubscribe();
  }

  fillFormValues(options): void {
    options.forEach(option => {
      this.optionsFormGroup.addControl(option.id, new FormControl(''));
      this.optionsFormGroup.patchValue({[option.id]: option.title});
      this.questionFormGroup.patchValue({title: this.title});
    });
  }

  formQuestionToEmit(optionsObject) {
    if (this.currentQuestion.type === 'Text') {
      return {
        id: this.currentQuestion.id,
        title: this.questionFormGroup.value.title,
        options: [{id: 1, title: ''}],
        type: this.currentQuestion.type
      };
    } else {
      const optionsArray = [];
      for (const key in optionsObject) {
        if (optionsObject.hasOwnProperty(key)) {
          optionsArray.push({id: key, title: optionsObject[key]});
        }
      }
      return {
        id: this.currentQuestion.id,
        title: this.questionFormGroup.value.title,
        options: optionsArray,
        type: this.currentQuestion.type
      };
    }
  }
  addOption(): void {
    const currentOption = this.questionService.addOption(this.options);
    this.options.push(currentOption);
    if (this.currentQuestion.type === 'Text') {
      this.canAddOption = false;
      return;
    }
    this.optionsFormGroup.addControl(currentOption.id, new FormControl(''));
  }

  deleteQuestion(): void {
    this.deletedElement.emit();
  }

  checkType(questionType): string {
    if (questionType === 'One answer') {
      return this.imgForSingle;
    } else if (questionType === 'Multiple answers') {
      return this.imgForMultiple;
    } else if (questionType === 'Text') {
      return this.imgForText;
    }
  }

  checkAddOptionAvailability(question) {
    if (question.type === 'Text' && (!question.hasOwnProperty('options'))) {
      this.addOption();
    } else if (question.type === 'Text' && question.options.length > 0) {
      this.canAddOption = false;
    }
  }

  deleteOption(currentElement, options) {
    this.optionsFormGroup.removeControl(currentElement.id);
    this.options = this.questionService.deleteElement(currentElement, options);
    if (this.currentQuestion.type === 'Text') {
      this.canAddOption = true;
    }
    return this.options;
  }

}
