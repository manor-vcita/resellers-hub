import { StoreService } from './../services/store/store.service';
import { UsersService } from './../services/users/users.service';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { UserType } from '../models/user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  emailSent = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private user: UsersService,
    private store: StoreService
  ) { }

  ngOnInit(): void {
    this.authService.angularFireAuth.authState.subscribe(user => {
      console.log(user);
      if (user?.uid) {
        this.user.getUserById(user.uid).subscribe(userRef => {
          if (userRef) {
            this.store.dispatchUser(userRef)
            const type = userRef.type;
            switch (type) {
              case UserType.vcita: {
                this.router.navigate(['vcita']);
                break;
              }
              case UserType.partner: {
                this.router.navigate([`hub/${userRef.hubId}`]);
                break;
              }
              case UserType.reseller: {
                this.router.navigate(['app/accounts'])
              }
            }
          }
        })
      }

    })
  }

  login(email: string) {
    this.authService.sendEmailLink(email);
  }

  sendEmailLink(email: string) {
    this.authService.sendEmailLink(email)
    .then((snap) => {
      console.log(snap);

      this.emailSent = true;
      window.localStorage.setItem('emailForSignIn', email);
    })
    .catch(err => {
      console.log(err);
    })
  }


}
