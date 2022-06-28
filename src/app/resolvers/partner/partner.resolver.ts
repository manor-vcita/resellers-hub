import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { catchError, EMPTY, Observable, of } from 'rxjs';
import { IHub } from 'src/app/models/hub.interface';

@Injectable({
  providedIn: 'root'
})
export class PartnerResolver implements Resolve<IHub> {
  constructor(
    private router: Router,
    private firestore: FirestoreService
    ) {}
  resolve(route: ActivatedRouteSnapshot): Observable<IHub> {
    return this.firestore.getPartnerById(route.params?.['id'])
    .pipe(
      catchError(() => {
        this.router.navigate([""]);
        return EMPTY;
      })
    );
  }
}
