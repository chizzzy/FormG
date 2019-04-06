import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionTypeService {
  private questionTypeBarSubject = new Subject();
  public questionTypeBar$ = this.questionTypeBarSubject.asObservable();
  constructor() { }
  openQuestionTypeBar() {
    this.questionTypeBarSubject.next(true);
  }
  closeQuestionTypeBar() {
    this.questionTypeBarSubject.next(false);
  }
}
