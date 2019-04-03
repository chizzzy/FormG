import { Component, OnInit } from '@angular/core';
import {PollsListService} from '../polls-list.service';

@Component({
  selector: 'app-polls-list',
  templateUrl: './polls-list.component.html',
  styleUrls: ['./polls-list.component.scss']
})
export class PollsListComponent implements OnInit {
  public polls;
  constructor(private pollsListService: PollsListService) { }
 // JSON.parse(localStorage.getItem('poll'));
  ngOnInit() {
    this.polls = JSON.parse(localStorage.getItem('poll'));
    console.log(this.polls);
    if (this.polls === null) {
      this.polls = [];
    }
  }
  openPoll(poll) {
    this.pollsListService.openPoll(poll);
    console.log(poll);
  }

}
