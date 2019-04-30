import {Component, OnDestroy, OnInit} from '@angular/core';
import {PollsListService} from '../question/services/polls-list.service';
import {PollsService} from '../../core/polls.service';

@Component({
  selector: 'app-polls-list',
  templateUrl: './polls-list.component.html',
  styleUrls: ['./polls-list.component.scss']
})
export class PollsListComponent implements OnInit, OnDestroy {
  public polls;
  isLoaded: boolean;
  public subscription;

  constructor(private pollsListService: PollsListService, private pollsService: PollsService) {
  }

  ngOnInit() {
    this.subscription = this.pollsService.getPolls().subscribe(polls => {
      if (Array.isArray(polls)) {
        if (polls.length == 0) {
          this.polls = [];
        } else {
          this.polls = polls;
        }
      }
      this.isLoaded = true;
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  openPoll(poll) {
    this.pollsListService.openPoll(poll);
  }

  createPoll(polls) {
    this.pollsListService.createPoll(polls);
  }

  deletePoll(poll) {
    this.polls = this.polls.filter(elem => poll.id !== elem.id);
    this.pollsListService.deletePoll(poll);
  }

}
