import { UserType } from './../models/user.interface';
import { UsersService } from './../services/users/users.service';
import { StoreService } from './../services/store/store.service';
import { AuthService } from './../services/auth/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivateAppGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private store: StoreService,
    private users: UsersService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise((resolve, reject) => {
      this.auth.user.subscribe(user => {
        if (user?.uid) {
          console.log(user?.uid);
          const uid = user.uid;
          this.users.getUserById(uid).subscribe(userInfo => {
            if(userInfo?.type === UserType.reseller) {
              resolve(true);
            } else {
              reject(state.root)
            }
          })
        } else {
          reject(state.root)
        }
      })
    })
  }

}
