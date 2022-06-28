import { UsersService } from './../../services/users/users.service';
import { AuthService } from './../../services/auth/auth.service';
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { map, mergeMap, Observable, of } from 'rxjs';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { StoreService } from 'src/app/services/store/store.service';
import { IUser } from 'src/app/models/user.interface';
import { IReseller } from 'src/app/models/reseller.interface';

@Injectable({
  providedIn: 'root'
})
export class ResellerResolver implements Resolve<IReseller> {
  constructor(
    private store: StoreService,
    private firestore: FirestoreService,
    private auth: AuthService,
    private users: UsersService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.firestore.getResellerByIdOnce(route.params['resellerId']);
  }
}
