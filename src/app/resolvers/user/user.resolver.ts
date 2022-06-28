import { StoreService } from './../../services/store/store.service';
import { UsersService } from './../../services/users/users.service';
import { AuthService } from './../../services/auth/auth.service';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/models/user.interface';
import { user } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<IUser> {

  constructor(
    private auth: AuthService,
    private users: UsersService,
    private store: StoreService
  ) {
  }

  resolve(): Observable<IUser> {
    const user$ = this.users.getUserByIdOnce(this.auth.userUid!);
    user$.subscribe(user => {
      this.store.dispatchUser(user);
    })
    return this.users.getUserByIdOnce(this.auth.userUid!)

  }

  getUser() {
    return new Promise((resolve, reject) => {
      this.auth.user.subscribe(user => {
        if (user?.uid) {
          console.log(user?.uid);
          const uid = user.uid;
          this.users.getUserById(uid).subscribe(userInfo => {
            if(userInfo) {
              this.store.dispatchUser(userInfo);
              resolve(true);
            } else {
              reject(false)
            }
          })
        } else {
          reject(false)
        }
      })
    })
  }
}
