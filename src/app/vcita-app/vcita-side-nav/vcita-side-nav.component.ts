import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vcita-side-nav',
  templateUrl: './vcita-side-nav.component.html',
  styleUrls: ['./vcita-side-nav.component.scss']
})
export class VcitaSideNavComponent implements OnInit {

  public showDefaultMessage = true; // default state
  selectedNavItem = -1;
  showMenuTexts = false;

  sideNavItems = [
    {
      name: 'Hubs',
      route: ['hubs'],
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
