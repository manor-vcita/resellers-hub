import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  public showDefaultMessage = true; // default state
  selectedNavItem = -1;
  showMenuTexts = false;

  sideNavItems = [
    {
      name: 'Accounts',
      route: ['accounts'],
      icon: 'stream',
      hover: false
    },
    {
      name: 'Reports',
      route: ['reports'],
      icon: 'insights',
      hover: false
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  toggleDefaultMessage(state: boolean) {
    this.showDefaultMessage = state;
  }

}
