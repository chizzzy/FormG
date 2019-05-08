import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
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

  constructor(private route: ActivatedRoute, private pollsService: PollsService, private router: Router) {
  }

  ngOnInit() {
    const pollId = this.route.snapshot.paramMap.get('id');
    if (pollId[0] === '_') {
      this.pollsService.getPollById(pollId).subscribe(response => {
        this.pollData = response[0];
        this.questions = this.pollData.questions || [];
        this.questions.forEach(question => {
          this.questionsFormGroup.addControl(question.id, new FormGroup({}));
        });
        this.isLoaded = true;
      });
    }

  }

  sendAnswer() {
    this.pollsService.sendAnswer(this.questionsFormGroup.value, this.pollData.id).subscribe();
    return this.router.navigateByUrl(`/polls/${this.pollData.id}/vote/success`);
  }

}
