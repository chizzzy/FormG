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
  @Output() questionData = new EventEmitter();
  @Input() questionType;
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
  public localStoragePollData;

  constructor(private questionService: QuestionService) {
  }

  ngOnInit() {
    this.localStoragePollData = JSON.parse(localStorage.getItem('poll'));
    if (this.localStoragePollData !== null) {
      if (this.localStoragePollData.questions.length !== 0) {
        const questionDataFromLocalStorage = this.localStoragePollData.questions
          .find(question => question.id === this.currentQuestion.id);
        if (questionDataFromLocalStorage !== undefined) {
          this.title = questionDataFromLocalStorage.value.title;
          this.questionFormGroup.patchValue({title: this.title});
          this.image = questionDataFromLocalStorage.image;
          const options = questionDataFromLocalStorage.value.options;
          if (Object.keys(options).length > 0) {
            for (const key in options) {
              if (options.hasOwnProperty(key)) {
                this.optionsFormGroup.addControl(key, new FormControl(''));
                this.options.push({option: options[key], id: key});
                this.optionsFormGroup.patchValue({[key]: options[key]});
              }
            }
          }
        }
      }
    }
    this.intervalSubscription =
      this.interval$.subscribe(() => {
        if (this.questionFormGroup.value !== undefined) {
          const outputQuestion = {id: this.currentQuestion.id, value: this.questionFormGroup.value, image: this.currentQuestion.image};
          this.questionData.emit(outputQuestion);
        }
      });
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
