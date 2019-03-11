import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  public options = [1];
  constructor() { }

  ngOnInit() {
  }
  addOption() {
    this.options.push(1);
  }
  deleteOption() {
  }
}
