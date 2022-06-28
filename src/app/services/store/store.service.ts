import { IReseller } from './../../models/reseller.interface';
import { IUser } from 'src/app/models/user.interface';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IHub } from 'src/app/models/hub.interface';
import { Hub } from 'src/app/models/hub.class';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private _user$ = new BehaviorSubject<IUser | any>({});
  private _hub$ = new BehaviorSubject<IHub | any>({});
  private _reseller$ = new BehaviorSubject<IReseller | any>({});

    dispatchUser(user: IUser) {
        this._user$.next(user);
    }

    dispatchHub(hub: IHub) {
      this._hub$.next(hub);
    }

    dispatchReseller(reseller: IReseller) {
      this._reseller$.next(reseller);
    }

    get user() {
      return this._user$.value;
    }

    get hub() {
      return this._hub$.value;
    }

    get hub$() {
      return this._hub$;
    }

    get reseller() {
      return this._reseller$.value;
    }

    get reseller$() {
      return this._reseller$;
    }

    get state() {
      return {
        user: this.user,
        hub: this.hub,
        reseller: this.reseller
      }
    }
  }
