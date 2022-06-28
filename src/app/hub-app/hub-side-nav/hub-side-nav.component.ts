import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hub-side-nav',
  templateUrl: './hub-side-nav.component.html',
  styleUrls: ['./hub-side-nav.component.scss']
})
export class HubSideNavComponent implements OnInit {

  public showDefaultMessage = true; // default state
  selectedNavItem = -1;
  showMenuTexts = false;

  sideNavItems = [
    {
      name: 'Resellers',
      route: ['resellers'],
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
