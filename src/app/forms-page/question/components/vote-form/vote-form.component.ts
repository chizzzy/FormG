import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PollsService} from '../../../../core/polls.service';

@Component({
  selector: 'app-vote-form',
  templateUrl: './vote-form.component.html',
  styleUrls: ['./vote-form.component.scss']
})
export class VoteFormComponent implements OnInit {
  public pollData;
  public questions;
  public isLoaded: boolean;
  public className;
  constructor(private route: ActivatedRoute, private pollsService: PollsService) { }

  ngOnInit() {
    const pollId = this.route.snapshot.paramMap.get('id');
    if (pollId[0] === '_') {
      this.pollsService.getPollById(pollId).subscribe(response => {
        this.pollData = response[0];
        this.questions = this.pollData.questions || [];
        this.isLoaded = true;
      });
    }
  }
  setTypeOfAnswer(questionType) {
    if (questionType === 'One answer') {
      return 'radio';
    } else if (questionType === 'Multiple answers') {
      return 'checkbox';
    } else {
      return 'text';
    }
  }

}
