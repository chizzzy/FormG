import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionTypeService {
  private questionTypeBarSubject = new Subject();
  public questionTypeBar$ = this.questionTypeBarSubject.asObservable();
  private questionTypeSubject = new Subject();
  public questionType$ = this.questionTypeSubject.asObservable();
  public imgForSingle = '../assets/icons/checked.svg';
  public imgForMultiple = '../assets/icons/radio-on-button.svg';
  public imgForText = '../assets/icons/edit-text.svg';
  constructor() { }
  openQuestionTypeBar() {
    this.questionTypeBarSubject.next(true);
  }
  closeQuestionTypeBar() {
    this.questionTypeBarSubject.next(false);
  }
  openMultipleBar() {
    this.questionTypeSubject.next(this.imgForMultiple);
  }
  openSingleBar() {
    this.questionTypeSubject.next(this.imgForSingle);
  }
  openTextBar() {
    this.questionTypeSubject.next(this.imgForText);
  }
}
