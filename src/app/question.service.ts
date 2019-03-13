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
  addElement(elementsArray) {
    if (elementsArray.length === 0) {
      return {id: 1, image: ''};
    }
    const currentId = elementsArray.length + 1;
    return {id: currentId, image: ''};
  }
}
