import { IHub } from './../../../models/hub.interface';
import { StoreService } from './../../../services/store/store.service';
import { FirestoreService } from './../../../services/firestore/firestore.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-hub-main',
  templateUrl: './hub-main.component.html',
  styleUrls: ['./hub-main.component.scss']
})
export class HubMainComponent implements OnInit {

  // hub: string;
  showMenuTexts = false;
  loading = true;
  partner: IHub;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private firestore: FirestoreService,
    private store: StoreService,
    private spinner: NgxSpinnerService
  ) {
    this.partner = this.route.snapshot.data['partner'];
    this.store.dispatchHub(this.partner);
  }

  ngOnInit(): void {
    this.spinner.show();
  }

}
