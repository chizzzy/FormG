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
  @Input() selectedPoll;
  @Input() ques;
  public image;
  public title;
  public optionsFormGroup = new FormGroup({});
  public questionFormGroup = new FormGroup({
    title: new FormControl(''),
    options: this.optionsFormGroup
  });
  public interval$ = interval(3000);
  public intervalSubscription;
  public currentQuestionFromSelectedPoll;

  constructor(private questionService: QuestionService) {
  }

  ngOnInit() {
    if ('questions' in this.selectedPoll) {
      this.currentQuestionFromSelectedPoll = this.selectedPoll.questions.filter(ques => ques.id === this.currentQuestion.id)[0];
      if (this.currentQuestionFromSelectedPoll.hasOwnProperty('info')) {
        this.title = this.currentQuestionFromSelectedPoll.info.title;
        const options = this.currentQuestionFromSelectedPoll.info.options;
        if (Object.keys(options).length > 0) {
          for (const key in options) {
            if (options.hasOwnProperty(key)) {
              this.options.push({id: key, title: options[key]});
              this.optionsFormGroup.addControl(key, new FormControl(''));
              this.optionsFormGroup.patchValue({[key]: options[key]});
              this.questionFormGroup.patchValue({title: this.title});
            }
          }
        }
      }
    }
    this.intervalSubscription =
      this.interval$.subscribe(() => {
        console.log(this.questionFormGroup);
          const outputQuestion = {
            id: this.currentQuestion.id,
            info: this.questionFormGroup.value,
            image: this.currentQuestion.image
          };
          this.questionData.emit(outputQuestion);
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
    this.optionsFormGroup.removeControl(currentElement.id);
    return this.options;
  }

}
