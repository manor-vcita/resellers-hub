import { IBusiness } from './../../models/business.interface';
import { IResellerAccount } from './../../models/resellerAccount.interface';
import { IReseller } from './../../models/reseller.interface';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { IHub } from 'src/app/models/hub.interface';
import { IBusinessFirestoreRecord } from 'src/app/models/resellerBusinessFirestore.interface';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  private hubsCollection: AngularFirestoreCollection<IHub>;
  hubs$: Observable<IHub[]>;

  private resellersCollection: AngularFirestoreCollection<IReseller>;
  resellers$: Observable<IReseller[]>;

  private businessCollection: AngularFirestoreCollection<IBusinessFirestoreRecord>;
  businesses$: Observable<IBusinessFirestoreRecord[]>;

  constructor(
    private afs: AngularFirestore
  ) {
    this.hubsCollection = this.afs.collection<IHub>('hubs');
    this.hubs$ = this.hubsCollection.valueChanges();
    this.resellersCollection = this.afs.collection<IReseller>('resellers');
    this.resellers$ = this.resellersCollection.valueChanges();
    this.businessCollection = this.afs.collection<IBusinessFirestoreRecord>('businesses');
    this.businesses$ = this.businessCollection.valueChanges();
  }

  // Partners (Hubs)

  get hubs() {
    return this.hubs$;
  }

  getHubById(id: string): Observable<IHub> {
    return this.hubsCollection.doc(id).valueChanges().pipe(
      map(hub => {
        hub!.createdAt = hub?.createdAt.toDate();
        return hub!;
      }),
      catchError(() => {
        return EMPTY;
      })
    )
  }

  getPartnerById(id: string): Observable<IHub> {
    return this.hubsCollection.doc(id).get().pipe(
      map(hub => {return hub.data()!;})
    );
  }

  createHub(hub: IHub, token: string) {
    this.afs.collection('hubs_tokens').doc(hub.id).set({token: token});
    return this.hubsCollection.doc(hub.id).set(hub);
  }


  // Resellers
  getResellersByPartnerId(hubId: string): Observable<IReseller[]> {
    return this.afs.collection<IReseller>('resellers', ref => {
      return ref.where('hubId', '==', hubId)
    }).valueChanges()
  }

  createReseller(reseller: IReseller) {
    return this.resellersCollection.doc(reseller.id).set(reseller);
  }

  getResellerById(id: string) {
    return this.resellersCollection.doc(id).valueChanges();
  }

  getResellerByIdOnce(id: string): Observable<IReseller> {
    return this.resellersCollection.doc(id).get().pipe(map(reseller => reseller.data()!));
  }

  addAccount(account: IResellerAccount) {
    return this.afs.collection('businesses').doc(account.id).set(account);
  }

  templateAccounts(resellerId: string): Observable<IBusiness[]> {
    return this.afs.collection<IBusiness>('businesses', ref => {
      return ref
        .where('resellerId', '==', resellerId)
        .where('isTemplate', '==', true)
    }).valueChanges();
  }

  getAccountsByResellerId(resellerId: string) {
    return this.afs.collection<IBusiness>('businesses', ref => {
      return ref
      .where('resellerId', '==', resellerId)
      // .orderBy('name')
    }).valueChanges();
  }

  // Create an account on the DB - only after an account was successfully created in vcita
  createBusiness(business: IBusinessFirestoreRecord) {
    return this.businessCollection.doc(business.id).set(business);
  }
}
