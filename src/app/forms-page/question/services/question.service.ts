import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private pollDataSubject = new Subject();
  public pollData$ = this.pollDataSubject.asObservable();
  constructor() { }
  sendPollData(pollData) {
    this.pollDataSubject.next(pollData);
  }
  deleteElement(currentElement, elementsArray, questionId) {
    const pollFromLocalStorage = JSON.parse(localStorage.getItem('poll'));
    elementsArray = elementsArray.filter(elem => currentElement.id !== elem.id);
    for (let i = 0; i < elementsArray.length; i++) {
      elementsArray[i].id = i + 1;
    }
    if (currentElement.hasOwnProperty('type')) {
      pollFromLocalStorage.questions = elementsArray;
    } else {
      pollFromLocalStorage.questions.map(question => {
        if (question.id == questionId) {
          question.options = elementsArray;
          return question;
        } else {
          return question;
        }
      });
    }
    localStorage.setItem('poll', JSON.stringify(pollFromLocalStorage));

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
