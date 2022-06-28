import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hub-top-nav',
  templateUrl: './hub-top-nav.component.html',
  styleUrls: ['./hub-top-nav.component.scss']
})
export class HubTopNavComponent implements OnInit {

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.auth.logout();
  }

}
