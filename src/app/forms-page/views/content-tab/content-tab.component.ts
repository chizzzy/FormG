import { Component, OnInit } from '@angular/core';
import {ViewEncapsulation} from '@angular/cli/lib/config/schema';

@Component({
  selector: 'app-content-tab',
  templateUrl: './content-tab.component.html',
  styleUrls: ['./content-tab.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContentTabComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
