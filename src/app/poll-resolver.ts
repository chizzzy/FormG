import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {PollsListService} from './polls-list.service';
import {map, tap} from 'rxjs/operators';

@Injectable()
export class PollResolver implements Resolve<any> {
  public data;
  constructor(private pollsListService: PollsListService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.pollsListService.pollData$.subscribe(data => this.data = data);
    return this.data;
  }
}
