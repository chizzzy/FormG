import {Component, OnInit} from '@angular/core';
import {PollsService} from '../../core/polls.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-show-result',
  templateUrl: './show-result.component.html',
  styleUrls: ['./show-result.component.scss']
})
export class ShowResultComponent implements OnInit {
  public questionsData = [];
  public isLoaded: boolean;
  public areAnswersShown: boolean;
  constructor(private pollsService: PollsService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    let questions;
    let answerData;
    const pollId = this.route.snapshot.paramMap.get('id');
    this.pollsService.getQuestionsDataAndAnswersById(pollId).subscribe(response => {
      if (response[0][0].hasOwnProperty('questions')) {
        questions = response[0][0].questions;
        answerData = response[1][0].answers;
      } else {
        answerData = response[0][0].answers;
        questions = response[1][0].questions;
      }
      questions.forEach(question => {
        const answers = [];
        answerData.forEach(answer => {
          for (const key in answer) {
            if (key == question.id) {
              answers.push(answer[key]);
            }
          }
        });
        question.answers = answers;
      });
      this.questionsData = questions;
      this.isLoaded = true;
    });
  }
  showAnswers() {
    this.areAnswersShown = !this.areAnswersShown;
  }

}
