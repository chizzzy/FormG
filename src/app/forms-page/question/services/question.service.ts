import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private pollDataSubject = new Subject();
  public pollData$ = this.pollDataSubject.asObservable();

  constructor() {
  }

  sendPollData(pollData) {
    this.pollDataSubject.next(pollData);
  }

  deleteElement(currentElement, elementsArray) {
    elementsArray = elementsArray.filter(elem => currentElement.id !== elem.id);
    for (let i = 0; i < elementsArray.length; i++) {
      elementsArray[i].id = i + 1;
    }
    return elementsArray;
  }

  addOption(optionArray) {
    if (optionArray.length === 0) {
      return {id: 1};
    }
    const currentId = optionArray.length + 1;
    return {id: currentId};
  }

  addQuestion(questionArray) {
    if (questionArray.length === 0) {
      return {id: 1, type: ''};
    }
    const currentId = questionArray.length + 1;
    return {id: currentId, type: ''};
  }
}
