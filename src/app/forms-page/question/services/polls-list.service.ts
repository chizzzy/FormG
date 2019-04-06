import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PollsListService {
  private pollDataSubject = new BehaviorSubject('val');
  public pollData$ = this.pollDataSubject.asObservable();
  private formsPageStateSource = new Subject();
  public formsPageState$ = this.formsPageStateSource.asObservable();
  constructor() { }
  openPoll(poll): void {
    this.pollDataSubject.next(poll);
  }
  createPoll(polls): void {
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
  deletePoll(poll){
    const polls = JSON.parse(localStorage.getItem('poll'));
    const updatedPolls = polls.filter(localStoragePoll => localStoragePoll.id !== poll.id);
    localStorage.setItem('poll', JSON.stringify(updatedPolls));
    return updatedPolls;
  }

}
