import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  constructor() { }
  deleteElement(currentElement, elementsArray) {
    elementsArray = elementsArray.filter(elem => {
      if (currentElement.id !== elem.id ) {
        return elem.id;
      }
    });
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
      return {id: 1, image: ''};
    }
    const currentId = questionArray.length + 1;
    return {id: currentId, image: ''};
  }
}
