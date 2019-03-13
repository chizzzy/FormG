import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {QuestionService} from '../question.service';
import {QuestionTypeService} from '../question-type.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  public options = [];
  @Output() deletedElement = new EventEmitter();
  @Input() questionType;
  public image;
  constructor(private questionService: QuestionService, public questionTypeService: QuestionTypeService) {
  }

  ngOnInit() {
  }
  addOption() {
    const currentOption = this.questionService.addElement(this.options);
    this.options.push(currentOption);
  }
  deleteQuestion() {
    this.deletedElement.emit();
  }

  deleteOption(currentElement, options) {
    this.options = this.questionService.deleteElement(currentElement, options);
    return this.options;
  }

}
