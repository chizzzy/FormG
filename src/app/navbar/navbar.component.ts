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

  languages: Language[] = [
    {value: 'english-0', viewValue: 'English'},
    {value: 'russian-1', viewValue: 'Русский'},
    {value: 'ukrainian-2', viewValue: 'Українська'}
  ];
  constructor() { }

  ngOnInit() {
  }

}
