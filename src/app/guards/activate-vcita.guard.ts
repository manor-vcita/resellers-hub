import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserType } from '../models/user.interface';
import { AuthService } from '../services/auth/auth.service';
import { UsersService } from '../services/users/users.service';

@Injectable({
  providedIn: 'root'
})
export class ActivateVcitaGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
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
              if(userInfo?.type === UserType.vcita) {
                resolve(true);
              } else {
                reject(this.router.navigate(['']))
              }
            })
          } else {
            reject(this.router.navigate(['']))
          }
        })
      })
  }

}
