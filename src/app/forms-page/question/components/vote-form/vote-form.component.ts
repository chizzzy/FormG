import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PollsService} from '../../../../core/polls.service';
import {QuestionService} from '../../services/question.service';
import {concat} from 'rxjs';
import {FormArray, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-vote-form',
  templateUrl: './vote-form.component.html',
  styleUrls: ['./vote-form.component.scss']
})
export class VoteFormComponent implements OnInit {
  public pollData;
  public questions;
  public isLoaded: boolean;
  public questionsFormArray = new FormArray([]);
  public questionsFormGroup = new FormGroup({questions: this.questionsFormArray});

  constructor(private route: ActivatedRoute, private pollsService: PollsService, private questionService: QuestionService) {
  }

  ngOnInit() {
    const pollId = this.route.snapshot.paramMap.get('id');
    if (pollId[0] === '_') {
      this.pollsService.getPollById(pollId).subscribe(response => {
        this.pollData = response[0];
        this.questions = this.pollData.questions || [];
        this.questions.forEach(question => this.questionsFormArray.setControl(question.id, new FormGroup({})));
        this.isLoaded = true;
      });
    }

  }

  sendAnswer() {
   console.log(this.questionsFormGroup.value);
  }

}
