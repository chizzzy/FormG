import { Component, OnInit } from '@angular/core';
import {PollsListService} from '../polls-list.service';

@Component({
  selector: 'app-forms-page',
  templateUrl: './forms-page.component.html',
  styleUrls: ['./forms-page.component.scss']
})
export class FormsPageComponent implements OnInit {
  public formsPageState;
  constructor(private pollsListService: PollsListService) { }

  ngOnInit() {

    this.pollsListService.formsPageState$.subscribe(formsPageState => {
      this.formsPageState = formsPageState;
    });
  }

}
