import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-vcita-top-nav',
  templateUrl: './vcita-top-nav.component.html',
  styleUrls: ['./vcita-top-nav.component.scss']
})
export class VcitaTopNavComponent implements OnInit {

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.auth.logout();
  }

}
