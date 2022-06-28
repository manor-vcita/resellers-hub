import { FirestoreService } from './services/firestore/firestore.service';
import { UsersService } from './services/users/users.service';
import { StoreService } from './services/store/store.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    // private route: ActivatedRoute,
    // private store: StoreService,
    // private users: UsersService,
    // private firestore: FirestoreService
  ) {

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }

}
