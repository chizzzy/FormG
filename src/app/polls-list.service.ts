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
    this.formsPageStateSource.next(true);
    this.pollDataSubject.next(poll);
  }
  closePoll() {
    this.formsPageStateSource.next(false);
  }
}
