import { UserType } from 'src/app/models/user.interface';
import { Route, Router } from '@angular/router';
import { StoreService } from './../services/store/store.service';
import { UsersService } from './../services/users/users.service';
import { AuthService } from './../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { IUser } from '../models/user.interface';

@Component({
  selector: 'app-after-sign-in',
  templateUrl: './after-sign-in.component.html',
  styleUrls: ['./after-sign-in.component.scss']
})
export class AfterSignInComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    public angularFireAuth: AngularFireAuth,
    private store: StoreService,
    private router: Router
  ) { }

  async ngOnInit() {
    this.authService.confirmSignInWithEmail()
    .then(async () => {
      this.authService.user.subscribe(user => {
        const uid = user?.uid;
        if (uid) {
          console.log(uid);
          this.usersService.getUserById(uid).subscribe(u => {
            console.log(u);
            this.store.dispatchUser(u!)
            console.log(this.store);
            this.redirectUser(u!);
          })
        }
      });
    })
    .catch(async (err) => {
      console.log(err);
    })
  }

  redirectUser(user: IUser) {
    console.log('redirecting user');
    console.log(user);


    switch (user.type) {
      case UserType.vcita:
        this.router.navigate([`vcita`]);
        break;
      case UserType.partner:
        this.router.navigate([`hub/${user.hubId}`]);
        break;
      case UserType.reseller:
        this.router.navigateByUrl(`/app`);
        break;
        default:
          this.router.navigateByUrl(`/login`);
    }
  }

}
