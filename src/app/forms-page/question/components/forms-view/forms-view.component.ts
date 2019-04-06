import { Component, OnInit } from '@angular/core';
import {PollsListService} from '../../services/polls-list.service';

@Component({
  selector: 'app-forms-view',
  templateUrl: './forms-view.component.html',
  styleUrls: ['./forms-view.component.scss']
})
export class FormsViewComponent implements OnInit {
  public formsPageState;
  constructor(private pollsListService: PollsListService) { }

  ngOnInit() {

    this.pollsListService.formsPageState$.subscribe(formsPageState => {
      this.formsPageState = formsPageState;
    });
  }

}
