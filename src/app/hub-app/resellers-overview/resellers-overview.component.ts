import { AuthService } from './../../services/auth/auth.service';
import { UsersService } from './../../services/users/users.service';
import { UserType, UserPermissions } from './../../models/user.interface';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreService } from './../../services/store/store.service';
import { IReseller } from './../../models/reseller.interface';
import { FirestoreService } from './../../services/firestore/firestore.service';
import { AfterContentInit, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import * as uuid from 'uuid';

@Component({
  selector: 'app-resellers-overview',
  templateUrl: './resellers-overview.component.html',
  styleUrls: ['./resellers-overview.component.scss']
})
export class ResellersOverviewComponent implements OnInit {

  isLoadingPage = true;

  resellers$!: Observable<IReseller[]>
  hubId: string;
  showNewResellerForm = false;
  progress = false;
  createResellerStates = {
    emailValidated: false,
    userCreated: false,
    inviteSent: false
  }

  createResellerForm = this.fb.group({
    resellerName: ['', Validators.required],
    resellerAdminFirstName: ['', Validators.required],
    resellerAdminLastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    sendInvite: [true, Validators.requiredTrue]
  });

  resellerFormErrorMessage = '';
  showResellerFormErrorMessage = false;

  constructor(
    private firestore: FirestoreService,
    private store: StoreService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private auth: AuthService,
    private users: UsersService
  ) {
    console.log(this.store.hub);
    this.hubId = this.store.hub.id;
  }

  ngOnInit(): void {
    try {
      this.resellers$ = this.firestore.getResellersByPartnerId(this.store.hub.hub.id);
      this.isLoadingPage = false;
    } catch (error) {
      console.log(error);
    }
  }

  async createReseller() {
    this.progress = true;
    // Reseller object
    const reseller: IReseller = {
      name: this.createResellerForm.value['resellerName'],
      id: uuid.v1(),
      hubId: this.store.hub.hub.id,
      createdAt: new Date()
    }

    // Admin user for the reseller
    const user = {
      uid: '',
      firstName: this.createResellerForm.value['resellerAdminFirstName'],
      lastName: this.createResellerForm.value['resellerAdminLastName'],
      email: this.createResellerForm.value['email'],
      type: UserType.reseller,
      hubId: this.store.hub.hub.id,
      resellerId: reseller.id,
      permissions: [UserPermissions.resellerAdmin],
      createdAt: new Date()
    }
    // Creating the reseller's admin user on Firebase
    this.auth.createUserWithEmailAndPassword(user.email, uuid.v1())
    .subscribe((res: any) => {
      user.uid = res.uid;
      // creating reseller's admin user on Firestore
      this.users.createUser(user);
      this.createResellerStates.emailValidated = true;
      // Creating reseller on Firestore
      this.firestore.createReseller(reseller)
      .then(() => {
        // Sending login invite to user
        this.createResellerStates.userCreated = true;
        if (this.createResellerForm.value['sendInvite']) {
          this.auth.sendEmailLink(user.email)
        }
      })
      .then(() => {
        // Update states
        this.createResellerStates.inviteSent = true;
        this.progress = false;
        this.showNewResellerForm = false;
      })
      .catch(error => {
        this.progress = false;
        this.showNewResellerForm = false;
        console.log(error);
        this.resellerFormErrorMessage = 'The email address is already in use by another account';
        this.showResellerFormErrorMessage = true;
        throw error;
      })
    })
  }

}
