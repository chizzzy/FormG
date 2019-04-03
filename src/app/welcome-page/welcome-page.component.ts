import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    localStorage.setItem('poll', JSON.stringify([{pollDescription: 'wqewq',
      pollTitle: 'dede',
      id: 505,
      0: {id: 1, value: {title: 'qweqwdsa', options: {1: 'dsadw', 2: 'gtrsd'}}},
      1: {id: 2, value: {title: 'qweewq', options: {1: 'sdwref'}}, image: '../../assets/icons/edit-text.svg'}
    }, {pollDescription: 'aaaaaaa',
      pollTitle: 'bbbbbbbbbb',
      id: 606,
      0: {id: 1, value: {title: 'vvvvvv', options: {1: 'dsadwdddddddd', 2: 'gtrscasdawdqqwd'}}},
      1: {id: 2, value: {title: 'ytrgf', options: {1: 'dsadwk;dlqwk'}}, image: '../../assets/icons/edit-text.svg'}
    }]));
  }

}
