import { IUser } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UsersService } from './../../../services/users/users.service';
import { IBusinessFirestoreRecord } from './../../../models/resellerBusinessFirestore.interface';
import { IReseller } from './../../../models/reseller.interface';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { IBusiness } from './../../../models/business.interface';
import { map, Observable } from 'rxjs';
import { IVcitaBusiness } from './../../../models/vcita-business.interface';
import { StoreService } from './../../../services/store/store.service';
import { VcitaService } from './../../../services/vcita/vcita.service';
import { CreateAccountDialogComponent } from '../create-account-dialog/create-account-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-accounts-list',
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.scss']
})
export class AccountsListComponent implements OnInit {

  showNewAccountForm = false;
  templateAccounts$!: Observable<IBusiness[]>;
  accounts$!: Observable<IBusiness[]>;

  createAccountForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    businessName: ['', Validators.required],
    template: [''],
    isTemplate: [false],
  })

  constructor(
    private users: UsersService,
    private auth: AuthService,
    private fb: FormBuilder,
    private vcita: VcitaService,
    private store: StoreService,
    private firestore: FirestoreService,
    private activatedRoute: ActivatedRoute
  ) {
    console.log(this.store.reseller);

    this.templateAccounts$ = this.firestore.templateAccounts(this.store.reseller.id);
    this.accounts$ = this.firestore.getAccountsByResellerId(this.store.reseller.id);
  }

  ngOnInit(): void {
    this.store.reseller;
  }

  logy() {
    console.log(this.activatedRoute.parent!.snapshot.data);
  }
  createAccount() {
    // Create the account object to be sent to vcita's Create Business API
    const business = {
      admin_account: {
        email: this.createAccountForm.value['email'],
        first_name: this.createAccountForm.value['firstName'],
        last_name: this.createAccountForm.value['lastName']
      },
      business: {
        name: this.createAccountForm.value['businessName']
      },
      meta: {
        is_template: this.createAccountForm.value['isTemplate'],
        template_business_id: this.createAccountForm.value['templateId'],
        note: `{resellerId: ${this.store.reseller.id}, hubId: ${this.store.reseller.hubId}}`
      }
    }


    const accountRef = this.vcita.createAccount(business, this.store.reseller.hubId);
    accountRef.subscribe((account: IVcitaBusiness) => {
      console.log(account);
      // After account is created, create an account entity in the DB.
      const firestoreAccount: IBusinessFirestoreRecord = {
        id: account.business.id,
        name: account.business.name,
        createdAt: account.business.created_at,
        resellerId: this.store.reseller.id,
        hubId: this.store.reseller.hubId,
        isTemplate: this.createAccountForm.value['isTemplate'],
        baseTemplateAccountId: this.createAccountForm.value['template'].id ? this.createAccountForm.value['template'].id : null,
        baseTemplateAccountName: this.createAccountForm.value['template'].name ? this.createAccountForm.value['template'].name : null
      };
      this.firestore.createBusiness(firestoreAccount)
      .then(() => { this.showNewAccountForm = false; })
      .catch((err) => { console.log(err); });
    });
  };


  accountsTrackBy(index: number, account: IBusiness) {
    return account.id;
  }

}
