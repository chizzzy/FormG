import { Component, OnInit } from '@angular/core';
import {PollsListService} from '../question/services/polls-list.service';

@Component({
  selector: 'app-polls-list',
  templateUrl: './polls-list.component.html',
  styleUrls: ['./polls-list.component.scss']
})
export class PollsListComponent implements OnInit {
  public polls;
  constructor(private pollsListService: PollsListService) { }
  ngOnInit() {

    this.polls = JSON.parse(localStorage.getItem('poll'));
    if (this.polls === null) {
      this.polls = [];
    }
  }
  openPoll(poll) {
    this.pollsListService.openPoll(poll);
  }
  createPoll(polls) {
    this.pollsListService.createPoll(polls);
  }

}
