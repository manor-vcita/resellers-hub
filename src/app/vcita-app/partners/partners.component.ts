import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { User } from './../../models/user.class';
import { UsersService } from './../../services/users/users.service';
import { UserType, UserPermissions } from './../../models/user.interface';
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { HubStatus, IHub } from 'src/app/models/hub.interface';
import * as generatePassword from 'generate-password';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss']
})
export class PartnersComponent implements OnInit {

  hubs$: Observable<IHub[]>;
  showNewHubForm = false;
  showCreateUserForm = false;
  progress = false;

  createHubForm = this.fb.group({
    id: ['', Validators.required],
    name: ['', Validators.required],
    token: ['', Validators.required]
  })

  createHubUserForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    invite: ['',]
  })

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private fb: FormBuilder,
    private firestore: FirestoreService
  ) {
    this.hubs$ = this.firestore.hubs;
  }

  ngOnInit(): void {
  }

  createHub() {
    this.progress = true;
    const hub: IHub = {
      name: this.createHubForm.value['name'],
      id: this.createHubForm.value['id'],
      createdAt: new Date(),
      status: HubStatus.Active
    };
    console.log(hub);

    this.firestore.createHub(hub, this.createHubForm.value['token'])
      .then(() => {
        this.progress = false;
      })
      .catch((err) => {console.log(err); });
  }

  createUser(hubId: string) {
    this.usersService.createHubUser({
      firstName: this.createHubUserForm.value.firstName,
      lastName: this.createHubUserForm.value.lastName,
      email: this.createHubUserForm.value.email,
      invite: this.createHubUserForm.value.invite,
      hubId: hubId
    });
    this.createHubForm.reset();
  }



}
