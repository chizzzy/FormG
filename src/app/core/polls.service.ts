import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {forkJoin} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PollsService {
  constructor(private http: HttpClient) {
  }

  getPolls() {
    return this.http.get('http://localhost:3000/polls');
  }

  generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  sendAnswer(answer, id) {
    return this.http.post(`http://localhost:3000/polls/${id}`, answer);
  }

  getPollById(id) {
    return this.http.get(`http://localhost:3000/polls/${id}`);
  }

  getQuestionsDataById(id) {
    return this.http.get(`http://localhost:3000/polls/${id}/questions`);
  }

  getQuestionsDataAndAnswersById(id) {
    return forkJoin(
      this.getQuestionsDataById(id),
      this.getPollsResultsById(id)
    );
  }

  getPollsResultsById(id) {
    return this.http.get(`http://localhost:3000/polls/${id}/answers`);
  }

    updatePollData(poll) {
    return this.http.post('http://localhost:3000/polls', poll);
  }

  deletePollById(id) {
    return this.http.delete(`http://localhost:3000/polls/${id}`);
  }
}
