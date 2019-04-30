import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  constructor() { }
  deleteElement(currentElement, elementsArray, questionId) {
    const pollFromLocalStorage = JSON.parse(localStorage.getItem('poll'));
    elementsArray = elementsArray.filter(elem => currentElement.id !== elem.id);
    for (let i = 0; i < elementsArray.length; i++) {
      elementsArray[i].id = i + 1;
    }
    if (currentElement.hasOwnProperty('image')) {
      pollFromLocalStorage.questions = elementsArray;
    } else {
      console.log(pollFromLocalStorage)
      pollFromLocalStorage.questions.map(question => {
        if (question.id == questionId) {
          question.options = elementsArray;
          return question;
        } else {
          return question;
        }
      });
      console.log(pollFromLocalStorage)
    }
    localStorage.setItem('poll', pollFromLocalStorage);

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
