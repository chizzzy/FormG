import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-questions',
  templateUrl: './questions-form.component.html',
  styleUrls: ['./questions-form.component.scss']
})
export class QuestionsFormComponent implements OnInit {
  public questions = [];
  constructor() { }

  ngOnInit() {
  }
  addQuestion() {
    this.questions.push(1);
  }
}
