import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PollsListService {
  private pollDataSubject = new Subject();
  public pollData$ = this.pollDataSubject.asObservable();
  private formsPageStateSource = new Subject();
  public formsPageState$ = this.formsPageStateSource.asObservable();
  constructor() { }
  openPoll(poll) {
    this.pollDataSubject.next(poll);
  }
  createPoll(polls) {
    let poll;
    if (polls.length === 0) {
      poll = {id: 1};
      polls.push(poll);
    } else {
      poll = {id: polls[polls.length - 1].id + 1};
      polls.push(poll);
    }
    localStorage.setItem('poll', JSON.stringify(polls));
    this.pollDataSubject.next(poll);
  }

}
