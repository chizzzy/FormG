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
  @Input() questionType: string;
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

  constructor(private questionService: QuestionService) {
  }

  ngOnInit(): void {
    const now = JSON.parse(localStorage.getItem('poll')).filter(poll => poll.id == 1)[0];
    fetch('http://localhost:3000/gg', {
      method: 'post',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(now)
    });
    if (!!this.selectedPoll) {
      if (this.selectedPoll.hasOwnProperty('questions')) {
        const currentQuestionFromSelectedPoll = this.selectedPoll.questions.filter(ques => ques.id === this.currentQuestion.id)[0];
        if (currentQuestionFromSelectedPoll.hasOwnProperty('options')) {
          this.title = currentQuestionFromSelectedPoll.title;
          const options = currentQuestionFromSelectedPoll.options;
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
    }
    this.intervalSubscription =
      this.interval$.subscribe(() => {
        const outputQuestion = {
          id: this.currentQuestion.id,
          title: this.questionFormGroup.value.title,
          options: this.questionFormGroup.value.options,
          image: this.currentQuestion.image
        };
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
    this.options = this.questionService.deleteElement(currentElement, options);
    this.optionsFormGroup.removeControl(currentElement.id);
    return this.options;
  }

}
