import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {PollsService} from '../../../core/polls.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PollsListService {
  private pollDataSubject = new BehaviorSubject('val');
  public pollData$ = this.pollDataSubject.asObservable();
  private formsPageStateSource = new Subject();
  public formsPageState$ = this.formsPageStateSource.asObservable();

  constructor(private pollsService: PollsService, private router: Router) {
  }

  openPoll(poll) {
    return this.router.navigateByUrl(`/polls/${poll.id}`);
  }

  createPoll(polls): void {
    let poll;
    poll = {id: this.pollsService.generateId()};
    polls.push(poll);
    this.pollDataSubject.next(poll);
  }

  deletePoll(poll) {
    this.pollsService.deletePollById(poll.id).subscribe();
  }

}
