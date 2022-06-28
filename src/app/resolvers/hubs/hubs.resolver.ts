import { IHub } from './../../models/hub.interface';
import { FirestoreService } from './../../services/firestore/firestore.service';
import { StoreService } from './../../services/store/store.service';
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HubsResolver implements Resolve<IHub> {
  constructor(
    private store: StoreService,
    private firestore: FirestoreService
  ) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<IHub> {
    return await this.getHub(route.params['id']);
  }

  getHub(id: string): Promise<IHub> {
    return new Promise((resolve, reject) => {
      this.firestore.getHubById(id).subscribe(hub => {
        this.store.dispatchHub(hub!);
        resolve(hub!)
      })
    })
  }
}
