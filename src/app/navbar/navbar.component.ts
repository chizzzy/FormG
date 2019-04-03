import { Component, OnInit } from '@angular/core';
import {ViewEncapsulation} from '@angular/cli/lib/config/schema';
export interface Language {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements OnInit {
  selectedValue: string;
  constructor() { }

  ngOnInit() {
  }

}
