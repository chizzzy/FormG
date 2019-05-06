import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PollsService} from '../../../../core/polls.service';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-vote-form',
  templateUrl: './vote-form.component.html',
  styleUrls: ['./vote-form.component.scss']
})
export class VoteFormComponent implements OnInit {
  public pollData;
  public questions;
  public isLoaded: boolean;
  public questionsFormGroup = new FormGroup({});

  constructor(private route: ActivatedRoute, private pollsService: PollsService) {
  }

  ngOnInit() {
    const pollId = this.route.snapshot.paramMap.get('id');
    this.pollsService.getPollsResultsById(pollId).subscribe(res => console.log(res));
    if (pollId[0] === '_') {
      this.pollsService.getPollById(pollId).subscribe(response => {
        this.pollData = response[0];
        this.questions = this.pollData.questions || [];
        this.questions.forEach(question => {
          this.questionsFormGroup.addControl(question.id, new FormGroup({}));
        });
        console.log(this.questionsFormGroup);
        this.isLoaded = true;
      });
    }

  }

  sendAnswer() {
    this.pollsService.sendAnswer(this.questionsFormGroup.value, this.pollData.id).subscribe();
    console.log(this.questionsFormGroup);
  }

}
