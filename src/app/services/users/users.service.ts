import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { IUser, UserPermissions, UserType } from 'src/app/models/user.interface';
import { AuthService } from '../auth/auth.service';
import { User } from 'src/app/models/user.class';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private usersCollection: AngularFirestoreCollection<IUser>;
  users$: Observable<IUser[]>;
  constructor(
    private afs: AngularFirestore,
    private authService: AuthService,
  ) {
    this.usersCollection = this.afs.collection<IUser>('users');
    this.users$ = this.usersCollection.valueChanges();
  }

  get hubs() {
    return this.users$;
  }

  createUser(user: IUser) {
    return this.usersCollection.doc(user.uid).set(user);
  }

  getUserById(id: string) {
    return this.usersCollection.doc(id).valueChanges();
  }

  getUserByIdOnce(id: string): Observable<IUser> {
    return this.usersCollection.doc(id).get().pipe(map(user => user.data()!));
  }

  async createVcitaUser(user: any) {
    const password = 'vcitaPass*@123';
    try {
      this.authService.createUserWithEmailAndPassword(user.email, password).subscribe((res: any) => {
        const vcitaUser = new User({
          uid: res.uid,
          type: UserType.vcita,
          permissions: [UserPermissions.vcitaAdmin],
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          createdAt: new Date()
        }).user;
        console.log(vcitaUser);

        this.usersCollection.doc(vcitaUser.uid).set(vcitaUser)
        if (user.invite) {
          this.authService.sendEmailLink(user.email)
        }
      })

    } catch (err) { console.log(err); }
  };

  async createPartnerUser(user: any) {
    const password = 'hubPass*@123';
    try {
      this.authService.createUserWithEmailAndPassword(user.email, password).subscribe((res: any) => {
        const hubUser = new User({
          uid: res.uid,
          type: UserType.partner,
          hubId: user.hubId,
          permissions: [UserPermissions.partnerAdmin],
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          createdAt: new Date()
        }).user;
        console.log(hubUser);

        this.usersCollection.doc(hubUser.uid).set(hubUser)
        if (user.invite) {
          this.authService.sendEmailLink(user.email)
        }
      })

    } catch (err) { console.log(err); }
  };

  async createHubUser(user: any) {
    const password = 'hubPass*@123';
    try {
      this.authService.createUserWithEmailAndPassword(user.email, password).subscribe((res: any) => {
        const resellerUser = new User({
          uid: res.uid,
          type: UserType.reseller,
          hubId: user.hubId,
          permissions: [UserPermissions.resellerAdmin],
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          createdAt: new Date()
        }).user;
        console.log(resellerUser);

        this.usersCollection.doc(resellerUser.uid).set(resellerUser)
        if (user.invite) {
          this.authService.sendEmailLink(user.email)
        }
      })

    } catch (err) { console.log(err); }
  };
}
