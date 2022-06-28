import { StoreService } from './../../services/store/store.service';
import { IReseller } from './../../models/reseller.interface';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { UsersService } from './../../services/users/users.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { lastValueFrom, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResellerUserResolver implements Resolve<boolean> {
  resellerId!: string;
  constructor(
    private auth: AuthService,
    private users: UsersService,
    private firestore: FirestoreService,
    private store: StoreService
  ) {}

  async resolve(): Promise<boolean> {
    return await this.init();
  }

  init(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      if (!this.store.user.uid) {
        console.log('if');

        this.auth.angularFireAuth.user.subscribe(async (userRef) => {
          this.store.dispatchUser(await lastValueFrom(this.users.getUserByIdOnce(userRef?.uid!)));
          const user = await lastValueFrom(this.users.getUserByIdOnce(this.store.user.uid))
          console.log(user);
          const reseller = await lastValueFrom(this.firestore.getResellerByIdOnce(user.resellerId!));
          this.store.dispatchReseller(reseller)
          resolve(true)
        })
      } else {
        const user = await lastValueFrom(this.users.getUserByIdOnce(this.store.user.uid))
        const reseller = await lastValueFrom(this.firestore.getResellerByIdOnce(user.resellerId!));
        console.log(reseller);
        this.store.dispatchReseller(reseller);
        resolve(true)
      }
    })
  }
}
